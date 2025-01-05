# Thread Clone
[Hosted Link](https://thread-project-1.onrender.com)

** Backend Hosted Link : https://thread-project.onrender.com **

### For checking purpose

## Username: Ratnakar
## Password: 123456


** https://thread-project.onrender.com/api/v1/user/register  (User Registration) **

{
    "message": "User registered successfully",
    "newUser": {
        "name": "Xyz Giri",
        "username": "Xyz",
        "email": "xyz123@gmail.com",
        "password": "$2b$10$jA2s6fc14SbIfMQRWc4Vreqdd3jpuA8TAUVj6iZkk.yEoKDYJStti",
        "phone": 9198461423,
        "gender": "male",
        "bio": null,
        "profilePicture": null,
        "otp": null,
        "otpIsValid": false,
        "validFor": null,
        "followers": [],
        "followings": [],
        "_id": "677a38aa5fbb1dddd813681a",
        "createdAt": "2025-01-05T07:45:47.082Z",
        "updatedAt": "2025-01-05T07:45:47.082Z",
        "__v": 0
    }
}

** https://thread-project.onrender.com/api/v1/user/login  (User Login) **

{
    "message": "User logged in successfully",
    "loggedInUser": {
        "_id": "677a38aa5fbb1dddd813681a",
        "name": "Xyz Giri",
        "username": "Xyz",
        "email": "xyz123@gmail.com",
        "phone": 9198461423
    }
}

** https://thread-project.onrender.com/api/v1/user/forgot-password (Forgot-Password) **

{
    "message": "Password reset email sent successfully"
}

** https://thread-project.onrender.com/api/v1/user (get all users) **

{
    "message": "Success",
    "users": [
        {
            "_id": "67760e51086b5ab6288279bf",
            "name": "Ratnakar Giri",
            "username": "Ratnakar",
            "email": "ratnakargiri973@gmail.com",
            "password": "$2b$10$hKh6HXn/0Svh1sQIA2Qr.uKhp9BPaLJXqCzHFZj1KP9n6SRWu9EFm",
            "phone": 8917428508,
            "gender": "male",
            "bio": "Always do that thing which makes you happy.",
            "otp": "298985",
            "otpIsValid": true,
            "validFor": "2025-01-05T07:07:51.577Z",
            "createdAt": "2025-01-02T03:56:01.936Z",
            "updatedAt": "2025-01-05T07:03:38.491Z",
            "__v": 46,
            "profilePicture": "https://res.cloudinary.com/dk9b873qc/image/upload/v1736005077/thread/xa80htq57wavo8bgk3jq.jpg",
            "followers": [
                "677685fa86e8b58ccfe77b89",
                "677952e4f11137b28ce50057"
            ],
            "followings": [
                "677685fa86e8b58ccfe77b89",
                "6776a41079b9809aca722d4f",
                "677952e4f11137b28ce50057",
                "6779558cf11137b28ce500bd"
            ]
        },
        {
            "_id": "677685fa86e8b58ccfe77b89",
            "name": "Gunu Giri",
            "username": "Gunu",
            "email": "gunuruni143@gmail.com",
            "password": "$2b$10$XTTOATl.jeuQKF3xNMpPduh5r83P/KXDFEP0ZuUMOXVbyft8U86/S",
            "phone": 7077790521,
            "gender": "male",
            "bio": "Always keep smile",
            "profilePicture": "https://res.cloudinary.com/dk9b873qc/image/upload/v1735828357/thread/qvi5ih0944nrepnc0mbf.jpg",
            "otp": null,
            "otpIsValid": false,
            "validFor": null,
            "followers": [
                "67760e51086b5ab6288279bf",
                "677952e4f11137b28ce50057"
            ],
            "followings": [
                "67760e51086b5ab6288279bf"
            ],
            "createdAt": "2025-01-02T12:26:34.663Z",
            "updatedAt": "2025-01-04T15:26:52.612Z",
            "__v": 64
        },
        {
            "_id": "6776a41079b9809aca722d4f",
            "name": "Smita Mohapatra",
            "username": "Smita",
            "email": "smita123@gmail.com",
            "password": "$2b$10$3oYVIS7T7NBD.lnNX.n1DOnqx4IkN8HofP0SmEsxwyhpZ/UWrbtUG",
            "phone": 8977526917,
            "gender": "female",
            "bio": null,
            "profilePicture": null,
            "otp": null,
            "otpIsValid": false,
            "validFor": null,
            "followers": [
                "677952e4f11137b28ce50057",
                "67760e51086b5ab6288279bf"
            ],
            "followings": [],
            "createdAt": "2025-01-02T14:34:56.796Z",
            "updatedAt": "2025-01-04T15:37:15.775Z",
            "__v": 32
        },
        {
            "_id": "677952e4f11137b28ce50057",
            "name": "Abhay Kumar",
            "username": "Abhay",
            "email": "abhay123@gmail.com",
            "password": "$2b$10$7jwS8LC5XL/Z7Om5SGO93.8HLKTZLDtZDFbo3Pd.0sSfLO2oFqtp2",
            "phone": 9668770072,
            "gender": "male",
            "bio": "Always Focused",
            "profilePicture": "https://res.cloudinary.com/dk9b873qc/image/upload/v1736004389/thread/quxlio6mbk8iw4heqzmv.jpg",
            "otp": null,
            "otpIsValid": false,
            "validFor": null,
            "followers": [
                "67760e51086b5ab6288279bf"
            ],
            "followings": [
                "67760e51086b5ab6288279bf",
                "677685fa86e8b58ccfe77b89",
                "6776a41079b9809aca722d4f"
            ],
            "createdAt": "2025-01-04T15:25:24.501Z",
            "updatedAt": "2025-01-04T15:37:19.252Z",
            "__v": 4
        },
        {
            "_id": "6779558cf11137b28ce500bd",
            "name": "Samir Raza",
            "username": "Samir",
            "email": "samir123@gmail.com",
            "password": "$2b$10$Rz.syAWJeLuKb4yYB0e5/OC8f/hnZjUhkat9ome4Xl7.00a.qVDK.",
            "phone": 4561237890,
            "gender": "male",
            "bio": null,
            "profilePicture": null,
            "otp": null,
            "otpIsValid": false,
            "validFor": null,
            "followers": [
                "67760e51086b5ab6288279bf"
            ],
            "followings": [],
            "createdAt": "2025-01-04T15:36:44.606Z",
            "updatedAt": "2025-01-04T15:37:22.403Z",
            "__v": 1
        }
    ]
}


** https://thread-project.onrender.com/api/v1/post/add [add post] **

{
    "message": "Your post uploaded successfully",
    "post": {
        "title": "My Third Book",
        "image": "https://res.cloudinary.com/dk9b873qc/image/upload/v1736064073/thread/vhecmwbu64fyihv6q6ng.jpg",
        "content": "Another day another book",
        "author": "Xyz",
        "authorId": "677a38aa5fbb1dddd813681a",
        "likes": [],
        "comments": [],
        "_id": "677a3c4a5fbb1dddd8136822",
        "createdAt": "2025-01-05T08:01:14.258Z",
        "updatedAt": "2025-01-05T08:01:14.258Z",
        "__v": 0
    }
}



** https://thread-project.onrender.com/api/v1/post [get all posts] **

{
    "message": "Success",
    "posts": [
        {
            "_id": "67795640f11137b28ce5010d",
            "title": "My First Book",
            "image": "https://res.cloudinary.com/dk9b873qc/image/upload/v1736005183/thread/zwoa3nsjtdtusd8oct8x.jpg",
            "content": "Excited to read this book",
            "author": "Ratnakar",
            "authorId": "67760e51086b5ab6288279bf",
            "likes": [
                "67760e51086b5ab6288279bf"
            ],
            "comments": [
                {
                    "user": "Ratnakar",
                    "userId": "67760e51086b5ab6288279bf",
                    "comment": "Great book i have ever read",
                    "_id": "67795659f11137b28ce50117",
                    "createdAt": "2025-01-04T15:40:09.846Z",
                    "updatedAt": "2025-01-04T15:40:27.500Z"
                }
            ],
            "createdAt": "2025-01-04T15:39:44.316Z",
            "updatedAt": "2025-01-04T15:40:37.315Z",
            "__v": 4
        },
        {
            "_id": "677a3c4a5fbb1dddd8136822",
            "title": "My Third Book",
            "image": "https://res.cloudinary.com/dk9b873qc/image/upload/v1736064073/thread/vhecmwbu64fyihv6q6ng.jpg",
            "content": "Another day another book",
            "author": "Xyz",
            "authorId": "677a38aa5fbb1dddd813681a",
            "likes": [],
            "comments": [],
            "createdAt": "2025-01-05T08:01:14.258Z",
            "updatedAt": "2025-01-05T08:01:14.258Z",
            "__v": 0
        }
    ]
}


** https://thread-project.onrender.com/api/v1/post/delete/677a3c4a5fbb1dddd8136822 [delete the post] **

{
    "message": "Post deleted successfully"
}
