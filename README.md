# BoradAPI
원티드 프리 온보딩 (에이모 기업과제 1주차) 10조 


# CRUD-API-NodeJS
### 1. 설명
 게시판 REST API
- 게시글 카테고리
- 게시글 검색
- 대댓글(1 depth)
    - 대댓글 pagination
- 게시글 읽힘 수
    - 같은 User가 게시글을 읽는 경우 count 수 증가하면 안 됨

### 2. 프로젝트 구조
- 기본 환경
  - IDE : VsCode 
  - OS : MAC
  - Git
- 웹 서버 어플리케이션 개발 환경
  - NodeJS
  - Express
  - TypeScript
  - TypeORM
- 데이터베이스
  - MongoDB 
### 3. 디렉토리 구조

```bash

├── src
│   ├── app
│         ├── controller   (컨트롤러)
│         ├── definition   (사용자 정의 타입 폴더)
│         ├── entity       (DB 모델)
│         ├── jwt-util     (인증 로직)
│         ├── middlewares  (인증 및 에러 미들웨어)
│         ├── routes       (라우터)
│         ├── passport     (login 모듈)
│         ├── seed         (seedData)
│         ├── exception    (에러 클래스)
│         ├── swagger      (API 문서)
│         ├── index.ts 
│         └── app.ts
│
├── ormconfig.ts
├── package.json 
└── tsconfig.json 

``` 
    
### 4. API 명세
[API 명세서]()

### 5. 빌드 및 실행 방법
- 파일명 변경 .env.sample ->  .env 
```
  mv .env.sample .env
  ```
- 명령어  (설치가 조금 오래 걸립니다. 조금만 기다려 주세요)
   ```shell
   npm i
   npm run api-docs
   npm start
   ```
- 접속

   http://localhost:3000/api-docs 

### 6.개발 보고서

 [보고서](https://github.com/earthkingman/BoradAPI/wiki)
