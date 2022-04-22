export default function authHeader() {
  // {"accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZWJhLnAubWFyY2hldHRpQGdtYWlsLmNvbSIsInJvbGVzIjpbIi9sb2dvdXQiLCIvbG9naW4iXSwiaXNzIjoiTkMtU0lQLUFQSS0yMDIyIiwiZXhwIjoxNjUxMjM4MDYwLCJpYXQiOjE2NTA2MzMyNjB9.MLOVairt9Z_u-D1Pj1EtB_kCn6nP7CSd60lReEGgZKchorDkou2eiLu3OxJmdNWZhzB0sHZPVOahiT7pFt6pMw"}
  // {"accessToken": "token..."}
  const user = JSON.parse(localStorage.getItem("user"));
  
  console.log(user);
  if (user && user.accessToken) {

    return { Authorization: "Bearer " + user.accessToken };
  } else {
    console.log("false header");
    return {};
  }
}
