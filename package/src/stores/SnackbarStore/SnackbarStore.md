# SnackbarStore
### observables
#### SignIn:
    openSignInSuccess:
        - type: bool
        - default: false
        
    openSignInFail:
        - type: bool
        - default: false
#### SignUp:
    openSignUpSuccess:
        - type: bool
        - default: false
        
    openSignUpTaken:
        - type: bool
        - default: false
        
    openSignUpPasswordUnequal:
        - type: bool
        - default: false    
        
    openSignUpFail:
        - type: bool
        - default: false
        
#### SignOut:
    openSignOutSuccess:
        - type: bool
        - default: false
        
    openSignOutFail:
        - type: bool
        - default: false
        
#### Comment:
    openCommentSuccess:
        - type: bool
        - default: false
    
    openCommentFail: 
        - type: bool
        - default: false
#### Vote:
    openVoteSuccess:
        - type: bool
        - default: false
        
    openVoteFail:
        - type: bool
        - default: false
#### ChangeUserData:
    openChangeUserDataSuccess:
        - type: bool
        - default: false
    
    openChangeUserDataFail:
        - type: bool
        - default: false
### actions:
    reset:
        - arguments: none
        - return: none
        - description: sets values to default