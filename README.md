
# CAREERGURU (Job Portal)

Jobseeker is a Job Portal where User can Register with OTP verification and login. Then he can access to feedpage where user can posts,like and comment . View Live Notifications, Follow and Unfollow Connections , Chat with friends , Profile Settings . Admin can Manage POST,JOB and USER Management.


## API Reference



#### Get HomePage

```http
  GET /jobseeker.gq
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get Login

```http
  GET /jobseeker.gq/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |


#### Get feed

```http
  GET /jobseeker.gq/feed
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |



#### Block Users

```http
  GET /jobseeker.gq/BlockUser/${userId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



## Run Locally

Clone the project

```bash
  git clone https://github.com/Ameen-Sajeed/CareerGuru_2ndProject
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## 🚀 About Me
I'm Amien Sajeed, Passionate full stack developer...


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ameen-sajeed.github.io/Portfolio/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/muhammed-amien-83bba71ba/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://mobile.twitter.com/AmienSajeed)

