# BoradAPI
원티드 프리 온보딩 (에이모 기업과제 1주차) 10조 
이 프로젝트는 원티드x위코드 백엔드 프리온보딩 과제 일환으로 aimmo에서 출제한 과제를 기반으로 만들었습니다.

## Members
|이름   |github                   |담당 기능|
|-------|-------------------------|--------------------|
|박지율 | [earthkingman](https://github.com/earthkingman)   | 개발 및 배포 환경 설정, 게시글 CRUD, API 보안   |
|염재선 | [Yeom Jae Seon](https://github.com/YeomJaeSeon) | DB Modeling, 댓글 대댓글 CRUD   |


### 1. 설명(개발 요구 사항)
- 원티드 지원 과제 내용 포함 (기본적인 게시판 글쓰기)
- 게시글 카테고리
- 게시글 검색
- 대댓글(1 depth)
    - 댓글 및 대댓글 pagination
- 게시글 읽힘 수
    - 같은 User가 게시글을 읽는 경우 count 수 증가하면 안 됨
- Rest API 설계
- Unit Test
- 1000만건 이상의 데이터를 넣고 성능테스트 진행 결과 필요

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
[API 명세서](https://app.swaggerhub.com/apis-docs/earthkingman/Aimo_api/1.0.0)

### 5. API 테스트 
- 접속

  http://3.36.121.236/api-docs/

### 6.개발 보고서

 [보고서](https://github.com/earthkingman/BoradAPI/wiki)
