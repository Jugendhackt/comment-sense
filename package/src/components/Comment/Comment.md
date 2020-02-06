# Comment

###required stores:
    - userStore
    - snackbarStore
    - commentStore
    
### functions:
    sendVote:
        - arguments: none
        - async: true
        - return: none
        - description: sends vote request to server
        
    showTime:
        - arguments: none
        - return: "day.month.year"
        - description: returns time to be shown in Comment
### props:
    - headline
    - content
    - author
    - voted (whether if comment is liked by user)
    - likes
### description:
Comment renders an ListItem, which shows a Comment for a site. Comment
used for topComments and site specific Comments as well. This component
shows headline, content, author, voted and likes of the Comment. 