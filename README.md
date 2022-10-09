## node-js template

# 폴더 구조 설명
```
📂 git@faceReader-MBTI/Server
  ┣📂 config
    ┣📜 adminJwtMiddleWare.js # 어드민 jwt인증 미들웨어
    ┣📜 userJwtMiddleWare.js # 유저 jwt인증 미들웨어
    ┣📜 baseResponseStatus.js # API 예외처리 응답문구 저장 파일
    ┣📜 database.js # .env로부터 DB정보 받아서 Database 매핑하는 파일
    ┣📜 express.js # node.js 서버 프레임워크 파일 | express로 API 프레임워크 제공
    ┣📜 response.js # API 호출 성공 & 실패 응답객체
    ┣📜 winston.js # node.js 에러 로그 설정파일
  ┣📂 modules
    ┣📜 swagger.js # API 명세서 파일
  ┣📂 src # Server API 메인 개발파일 저장 디렉토리
    ┣📂 admin
      ┣📂 Attendance
        ┣📜 AttendanceController.js
        ┣📜 AttendanceProvider.js
        ┣📜 AttendanceService.js
        ┣📜 AttendanceDao.js
        ┣📜 AttendanceRouter.js
      ┣📂 Auth
      ┣📂 FinAccount
      ┣📂 Group
      ┣📂 Member
      ┣📂 Schedule
      ┣📂 Attendance
      ┣📂 TestInit
    ┣📂 user
      ┣📂 Auth
      ┣📂 FinAccount
      ┣📂 Group
      ┣📂 Member
      ┣📂 Schedule
      ┣📂 Attendance
      ┣📂 TestInit
  ┣📜.gitignore
  ┣📜 init.js  # node.js 메인 실행 파일
  ┣📜 README.md
  ┣📜.env # Database 정보
  ┣📜 package.json # node.js 실행 관련 설정파일
```

# 테스트 api

## 1. GET

```jsx
/**
 * API No. 0.1*
 * API Name : GET 테스트 API
 * [GET] /test
 */
```

## 2. POST

```jsx
/**
 * API No. 0.2
 * API Name : POST 테스트 API
 * [POST] /test
 */
```

## 3. DB

```jsx
/**
 * API No. 0.3
 * API Name : db 테스트 API
 * [GET] /test/db
 */
```

**db 테스트 시, .env 파일을 별도로 생성하여, 해당 key값을 따로 적어야 함.**
