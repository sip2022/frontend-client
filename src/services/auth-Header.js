export default function authHeader() {
  // {"accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzZWJhLnAubWFyY2hldHRpQGdtYWlsLmNvbSIsInJvbGVzIjpbIi9sb2dvdXQiLCIvbG9naW4iXSwiaXNzIjoiTkMtU0lQLUFQSS0yMDIyIiwiZXhwIjoxNjUxMjM4MDYwLCJpYXQiOjE2NTA2MzMyNjB9.MLOVairt9Z_u-D1Pj1EtB_kCn6nP7CSd60lReEGgZKchorDkou2eiLu3OxJmdNWZhzB0sHZPVOahiT7pFt6pMw"}
  // {"accessToken": "token..."}
  const user = localStorage.getItem("accessToken");
  if (user) {
    return { Authorization: user };
  } else {
    return {};
  }
}
