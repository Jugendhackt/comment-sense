# UserStore
### observables:
    username:
        - type: string
        - default: ""
        
    password:
        - type: string
        - default: ""
        
    repeatPassword:
        - type: string
        - default: ""
    
    newPassword:
        - type: string
        - default: ""
        
    email:
        - type: string
        - default: ""
        
    sid:
        - type: string
        - default: ""
        
    loggedIn:
        - type: bool
        - default: false
### actions:
    signIn:
        - arguments:
            - sessionId
            - username
        - return: none
        - description: sets sessionId, username and loggedIn to true
    
    clearInput:
        - arguments: none
        - return: none
        - description: set username, password, email and newPassword to ""
       
    reset:
        - arguments: none
        - return: none
        - description: sets value to default