# DialogStore
### observables:
    openSignIn:
        - type: bool
        - default: false
        
    openSignUp:
        - type: bool
        - default: false
        
    openAccount:
        - type: bool
        - default: false
        
    anchorElAccount:
        - type: null|target
        - default: null
        
    openDrawer:
        - type: bool
        - default: false
        
    openComment:
        - type: bool
        - default: false
        
    openChangeUser:
        - type: bool
        - default: false
        
### actions:
    setAccount:
        - arguments: 
            - openAccount
            - anchorElAccount
        - return: none
        - description: sets openAccount and anchorElAccount
        
        closeSignIn:
            - arguments: none
            - return: none
            - description: sets openSignIn and openDrawer to false
   
        closeSignUp:
            - arguments: none
            - return: none
            - description: sets openSignUp and openDrawer to false
            
        reset:
            - sets values to default