#include "tlsSocket.hpp"

int verify(struct TLSContext *context, struct TLSCertificate **certificate_chain, int len) {
    int err;
    if (certificate_chain) {
        for (int i = 0; i < len; i++) {
            struct TLSCertificate *certificate = certificate_chain[i];
            // check validity date
            err = tls_certificate_is_valid(certificate);
            if (err)
                return err;
            // check certificate in certificate->bytes of length certificate->len
            // the certificate is in ASN.1 DER format
        }
    }
    // check if chain is valid
    err = tls_certificate_chain_is_valid(certificate_chain, len);
    if (err)
        return err;

    const char *sni = tls_sni(context);
    if ((len > 0) && (sni)) {
        err = tls_certificate_valid_subject(certificate_chain[0], sni);
        if (err)
            return err;
    }

    // Perform certificate validation against ROOT CA
    err = tls_certificate_chain_is_valid_root(context, certificate_chain, len);
    if (err)
        return err;

    std::cerr<<"Certificate OK\n";
    return no_error;
}

TLSSocket::TLSSocket(int af, int type, int protocol):
	TCPSocket(af, type, protocol)
{
	context = nullptr;
}

TLSSocket::TLSSocket(socket_t other, SSL *context):
	TCPSocket (other)
{
	this->context = context;
}

TLSSocket::~TLSSocket()
{
	if(context)
		SSL_CTX_free(context);
}

void TLSSocket::listen()
{
	TCPSocket::listen();
	context = SSL_CTX_new(SSLv3_server_method());
	if(!context){
		std::cerr<<"ERROR: couldn't create serve context\n";
		return;
	}
	SSL_CTX_use_certificate_file(context, "./localhost.crt", SSL_SERVER_RSA_CERT);
	SSL_CTX_use_PrivateKey_file(context, "./localhost.key", SSL_SERVER_RSA_KEY);
	
	if(!SSL_CTX_check_private_key(context)){
		std::cerr<<"ERROR: private key not loaded\n";
	}
}

TLSSocket *TLSSocket::accept()
{
	struct sockaddr_in client;
    unsigned int len = sizeof(client);
    socket_t new_socket = ::accept(sock,(struct sockaddr *)&client, &len);
    if(new_socket  == -1)
        std::cerr<<"error: couldn't accept socket: "<<strerror(errno)<<"\n";
	SSL *client_ctx = SSL_new(context);
	SSL_set_fd(client_ctx, new_socket);
	if(SSL_accept(client_ctx)){
		TLSSocket *socket = new TLSSocket(new_socket, client_ctx);
		socket->setTimeout(5);
		return socket;
	}
	return nullptr;
}

void TLSSocket::connect(std::string servAddr, unsigned short port)
{
	int portno;
	struct sockaddr_in server;
    struct hostent *host_info;
    unsigned long addr;
    int ret;
	
	context = SSL_CTX_new(SSLv3_client_method());
	int res = SSL_CTX_root_ca(context, "root.pem");
#if defined(DEBUG)
	std::cerr<<"Loaded"<<res<<"certificates\n";
#endif
	SSL_CTX_set_verify(context, SSL_VERIFY_PEER, verify);
	if (!context) {
		std::cerr<<"Error initializing client context\n";
		return;
	}
	sock = socket(AF_INET, SOCK_STREAM, 0);
	memset(&server, 0, sizeof (server));
    if((addr = inet_addr(servAddr.c_str())) != INADDR_NONE) {
        memcpy(&server.sin_addr, &addr, sizeof(addr));
    }
	else{
		host_info = gethostbyname(servAddr.c_str());
        if(host_info == nullptr)
            fprintf(stderr, "error: unknown server: %s\n", strerror(errno));
        else
            memcpy(&server.sin_addr, host_info->h_addr, host_info->h_length);
	}
	server.sin_family = AF_INET;
    server.sin_port = htons(port);
	if(::connect(sock, (struct sockaddr*)&server, sizeof(server)) < 0){
		fprintf(stderr, "error: couldn't connect to server: %s\n", strerror(errno));
		return;
	}
	SSL_set_fd(context, sock);
	//tls_sni_set(context, argv[1]);
	if ((ret = SSL_connect(context)) != 1) {
        std::cerr<<"Handshake Error"<<ret<<"\n";
    }
}

void TLSSocket::disconnect()
{
	if(sock >= 0 && context){
        std::cout<<getError();
		SSL_shutdown(context);
        if(shutdown(sock, SHUT_RDWR) < 0){
			if (errno != ENOTCONN && errno != EINVAL){
#if defined(DEBUG)
                std::cerr<<"error: shutdown socket failed\n";
#endif
			}
        }
        if(close(sock) < 0){
#if defined(DEBUG)
            std::cerr<<"error: close socket failed\n";
#endif
        }
		SSL_free(context);
		context = nullptr;
    }
}

bool TLSSocket::send(std::string data)
{
	if(isConnected()){
		unsigned long chunk = 16*1024;
		unsigned long size = data.size();
		unsigned long chunks = size/chunk;
		unsigned long rest = size%chunk;
		for(int i = 0; i < chunks; i++){
			if(SSL_write(context, &data.c_str()[i*chunk], chunk) <= 0){
#if defined(DEBUG)
		std::cerr<<"error: tcp send(): "<<strerror(errno)<<"\n";
#endif
				return false;
			}
		}
		if(SSL_write(context, &data.c_str()[chunks*chunk], rest) <= 0){
#if defined(DEBUG)
		std::cerr<<"error: tcp send(): "<<strerror(errno)<<"\n";
#endif
			return false;
		}
	}
    return true;
}

std::string TLSSocket::recv(int len)
{
	if(!isConnected())
		return "";
	char *data = new char[len];
	int size = SSL_read(context, data, size_t(len));
	if(size < len)
		data[size] = 0;
	std::string str(size_t(len), '\0');
    memcpy(&str[0], data, size_t(len));
	delete[] data;
	return str;
}

std::vector<std::string> TLSSocket::recvHeader()
{
	if(!isConnected())
		return std::vector<std::string>();
	std::vector<std::string> header;
	std::string line;
	char c;
	while(SSL_read(context, &c, size_t(1)) >= 0){
		if(c == '\r')
			continue;
		if(c == '\n'){
			if(line.size() == 0)
				break;
			header.push_back(line);
			line.clear();
			continue;
		}
		line.push_back(c);
	}
	return header;
}
