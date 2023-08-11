# 칸반보드

# Team

- 팀명 : 5조5시조
- 팀장 : 김필선
- 팀원 : 방두현, 오동현, 김주희

---

# Project

## Summary

- 작업 진행 현황을 한 눈에 볼 수 있는 Trello 보드 제작

## Wireframe

###

![Untitled](https://github.com/sunsurely/trelloproject/assets/133676789/b8125436-62be-4f96-b5c4-d34e1fb4f884)

---

## Database

### MYSQL

---

### ERD

![trello cloning - Page 3](https://github.com/sunsurely/trelloproject/assets/133676789/bf36411b-ddec-41b9-9edd-efb4ac360ea9)

## API Statement

| Function                          | Method | End Point                                          | Request                                                                                                                                                                                        | Response                                                                                                                                              | Response(error)                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :-------------------------------- | :----- | :------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 회원가입                          | POST   | /members/signup                                    | {<br>“name”:“홍길동”,<br>“email”:“aaa@gmail.com” ,<br>“password”: “1234”,<br>”confirm”:”1234”,<br>“content”:”반갑습니다”<br>}                                                                  | #201 회원가입에 성공한 경우<br>{ “message”: “회원 가입에 성공하였습니다.” }                                                                           | # 412 모든 항목을 입력하지 않을 경우<br>{"message": "모든 항목을 입력해주셔야 합니다."}<br># 412 password가 일치하지 경우<br>{"message": "패스워드가 일치하지 않습니다."}<br># 412 password 형식이 비정상적인 경우<br>{"message": "패스워드 형식이 일치하지 않습니다.}<br># 412 이메일이 중복된 경우<br>{"message": "중복된 이메일입니다."}<br># 400 예외 케이스에서 처리하지 못한 에러<br>{"message": "Server Error"}                                                     |
| 로그인                            | POST   | /members/signin                                    | <br>{<br>“email”: “aaa@gmail.com”,<br>“password”: “1234”<br>}                                                                                                                                  | #200 로그인에 성공한 경우<br>{ “message”: “로그인에 성공하였습니다.” }                                                                                | #412 해당하는 유저가 존재하지 않거나 패스워드가 틀릴 경우<br>{ ”message”: “닉네임 또는 패스워드를 확인해 주세요” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “로그인에 실패하였습니다.” }                                                                                                                                                                                                                                                                 |
| 유저 정보 조회                    | GET    | /members/me/:userId                                |                                                                                                                                                                                                | #200 유저 정보 조회 된 경우<br>{<br>“email” : “aaa@gamil.com”,<br>“content” : “반갑습니다.”<br>}                                                      | #404 유저가 존재하지 않는 경우<br>{ “message”: “유저가 존재하지 않습니다.” }<br>#403 Cookie가 존재하지 않는 경우<br>{ “message”: “로그인이 필요한 기능입니다.” }<br>#403 Cookie가 비정상적이거나 만료된 경우<br>{ “message”: “전달된 쿠키에서 오류가 발생하였습니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “유저 정보 조회에 실패하였습니다.” }                                                                                                    |
| 유저 정보 수정                    | PUT    | /members/me/:userId                                | {<br>“password” : “1234”,<br>“content” : “하이요”<br>}                                                                                                                                         | #200 유저 정보가 수정 된 경우<br>{”message”:”유저 정보가 완료 되었습니다.”}                                                                           | #404 유저가 존재하지 않는 경우<br>{ “message”: “유저가 존재하지 않습니다.” }<br>#403 Cookie가 존재하지 않는 경우<br>{ “message”: “로그인이 필요한 기능입니다.” }<br>#403 Cookie가 비정상적이거나 만료된 경우<br>{ “message”: “전달된 쿠키에서 오류가 발생하였습니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “유저 정보 수정에 실패하였습니다.” }                                                                                                    |
| 유저 삭제                         | DELETE | /members/me/:userId                                | {<br>“password” : “1234”<br>}                                                                                                                                                                  | #200 유저 정보가 삭제 된 경우<br>{”message”:”유저 정보가 삭제 되었습니다.”}                                                                           | #404 유저가 존재하지 않는 경우<br>{ “message”: “유저가 존재하지 않습니다.” }<br>#403 Cookie가 존재하지 않는 경우<br>{ “message”: “로그인이 필요한 기능입니다.” }<br>#403 Cookie가 비정상적이거나 만료된 경우<br>{ “message”: “전달된 쿠키에서 오류가 발생하였습니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “유저 정보 수정에 실패하였습니다.” }                                                                                                    |
| 보드 등록(보드 워크스페이스 생성) | POST   | /boards                                            | {<br>“name” : “5조계획표”,<br>“userId”: 2,<br>“color” : “green”,<br>“discription”:”우리의 계획!”<br>}                                                                                          | #201 등록 된 경우<br>{”message”:”등록되었습니다.”}                                                                                                    | #412 body 데이터가 정삭적으로 전될되지 않는 경우<br>{ “message”: “데이터 형식이 올바르지 않습니다.” }<br>#403 계정이 admin계정이 아닐 경우<br>{ “message”: “admin계정이 아닙니다.” }<br>#403 Cookie가 존재하지 않는 경우<br>{ “message”: “로그인이 필요한 기능입니다.” }<br>#403 Cookie가 비정상적이거나 만료된 경우<br>{ “message”: “전달된 쿠키에서 오류가 발생하였습니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “가게 등록에 실패하였습니다.” } |
| 보드 목록 조회                    | GET    | /boards                                            |                                                                                                                                                                                                | #200 보드 조회 된 경우<br>{ <br>“name” : “5조계획표”,<br>“color” : “green”,<br>“description”:”우리의 계획!”<br>}                                      | #404 보드가 존재하지 않는 경우<br>{ “message”: “보드가 존재하지 않습니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “보드 조회에 실패하였습니다.” }                                                                                                                                                                                                                                                                                                    |
| 보드조회                          | GET    | /boards/:boardId                                   |                                                                                                                                                                                                | #200 보드 조회 된 경우<br>{<br>“name” : “5조계획표”,<br>“color” : “green”,<br>“description”:”우리의 계획!”<br>}                                       | #404 보드가 존재하지 않는 경우<br>{ “message”: “보드가 존재하지 않습니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “보드 조회에 실패하였습니다.” }                                                                                                                                                                                                                                                                                                    |
| 보드 수정                         | PUT    | /boards/:boardId                                   | {<br>“name” : “5조계획표”,<br>“color” : “green”,<br>“discription”:”우리의 계획!”<br>}                                                                                                          | #200 수정된 경우<br>{”message”:”수정 되었습니다.”}                                                                                                    | # 412 보드 이름이 중복된 경우<br>{"message": "중복된 보드 이름입니다."}<br># 400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “보드 수정에 실패하였습니다.” }                                                                                                                                                                                                                                                                                                        |
| 보드 삭제                         | DELETE | /boards/:boardId                                   |                                                                                                                                                                                                | #200 삭제된 경우<br>{”message”:”삭제 되었습니다.”}                                                                                                    | #404 보드가 존재하지 않는 경우<br>{ “message”: “보드가 존재하지 않습니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “보드 삭제에 실패하였습니다.” }                                                                                                                                                                                                                                                                                                    |
| 보드 친구(사용자) 초대            | POST   | /boards/:boardId/invitation                        | {<br>“email” : “aaa@gmail.com”<br>}                                                                                                                                                            | #200 초대에 성공한 경우<br>{”message”:”초대 되었습니다.”}                                                                                             |
| 보드 멤버조회                     | GET    | /boards/:boardId/invitation                        |                                                                                                                                                                                                |                                                                                                                                                       |
| 컬럼 조회                         | GET    | /boards/:boardId/column                            |                                                                                                                                                                                                | #200 조회된 경우<br>{<br>"columnList": [<br>{<br>"name": "컬럼 이름",<br>"position": 4<br>},<br>{<br>"name": "컬럼 이름",<br>"position": 3<br>}<br>]} | #404 보드가 존재하지 않는 경우<br>{ “message”: “존재하지 않는 보드입니다.” }<br>#403 해당 보드에 초대되지 않은 유저의 경우<br>{ “message”: “해당 보드에 초대된 회원이 아닙니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “Server Error” }                                                                                                                                                                                                             |
| 컬럼 생성                         | POST   | /boards/:boardId/column                            | {<br>“name” : “Upcomming”,<br>“position” : 1<br>}                                                                                                                                              | #201 등록 된 경우<br>{”message”:”컬럼을 추가하였습니다.”}                                                                                             | # 400 name을 입력하지 않는 경우<br>{"message": "컬럼 이름을 입력해주세요."}<br># 400 position을 입력하지 않는 경우<br>{"message": "컬럼 위치를 입력해주세요."}<br>#404 보드가 존재하지 않는 경우<br>{ “message”: “존재하지 않는 보드입니다.” }<br>#403 해당 보드에 초대되지 않은 유저의 경우<br>{ “message”: “해당 보드에 초대된 회원이 아닙니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “Server Error” }                                           |
| 컬럼 이름 수정                    | PUT    | /boards/:boardId/column/:columnId/name             | {<br>“name” : “In Progress”<br>}                                                                                                                                                               | #200 수정된 경우<br>{”message”:”컬럼 이름이 수정되었습니다.”}                                                                                         | # 400 name을 입력하지 않는 경우<br>{"message": "수정할 컬럼 이름을 입력해주세요."}<br>#404 컬럼이 존재하지 않는 경우<br>{ “message”: “존재하지 않는 컬럼입니다.” }<br>#403 해당 보드에 초대되지 않은 유저의 경우<br>{ “message”: “해당 보드에 초대된 회원이 아닙니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “Server Error” }                                                                                                                       |
| 컬럼 순서 수정                    | PUT    | /boards/:boardId/column/:columnId/position         | {<br>“position” : 2<br>}                                                                                                                                                                       | #200 수정된 경우<br>{”message”:”컬럼 위치가 수정되었습니다.”}                                                                                         | # 400 position을 입력하지 않는 경우<br>{"message": "수정할 컬럼 위치를 입력해주세요."}<br>#404 컬럼이 존재하지 않는 경우<br>{ “message”: “존재하지 않는 컬럼입니다.” }<br>#403 해당 보드에 초대되지 않은 유저의 경우<br>{ “message”: “해당 보드에 초대된 회원이 아닙니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “Server Error” }                                                                                                                   |
| 컬럼 삭제                         | DELETE | /boards/:boardId/column/:columnId                  |                                                                                                                                                                                                | #200 삭제된 경우<br>{”message”:”컬럼을 삭제하였습니다.”}                                                                                              | #404 컬럼이 존재하지 않는 경우<br>{ “message”: “존재하지 않는 컬럼입니다.” }<br>#403 해당 보드에 초대되지 않은 유저의 경우<br>{ “message”: “해당 보드에 초대된 회원이 아닙니다.” }<br>#400 예외 케이스에서 처리하지 못한 에러<br>{ “message”: “Server Error” }                                                                                                                                                                                                             |
| 카드 조회                         | GET    | /boards/:boardId/cards                             |                                                                                                                                                                                                |                                                                                                                                                       |
| 카드 생성                         | POST   | /boards/:boardId/cards                             | {<br>“name” : “와이어프레임짜기”,<br>“description” : “대략적인 와이어 프레임 짜기”,<br>”position”:1 (if position is not existing, the default value will be 0)<br>“deadline”:”2023-09-27”<br>} |                                                                                                                                                       |
| 카드 내용 + 순서 수정             | PUT    | /boards/:boardId/cards/:cardId                     | {<br>“name” : “이걸로 바꾸기”,<br>“description” : “이건 꼭 해내자!”,<br>“deadline”:”2080-12-31”<br>}                                                                                           |                                                                                                                                                       |
| 카드 삭제                         | DELETE | /boards/:boardId/cards/:cardId                     |                                                                                                                                                                                                |                                                                                                                                                       |
| 카드에 댓글 달기                  | POST   | /boards/:boardId/cards/:cardId/comments            | {<br>“content” : “댓글이여”<br>}                                                                                                                                                               |                                                                                                                                                       |
| 카드 댓글 삭제                    | DELETE | /boards/:boardId/cards/:cardId/comments/:commentId |                                                                                                                                                                                                |                                                                                                                                                       |

## 역할 분담

김필선

- 인증관련(회원가입, 로그인), 회원조회, 회원정보수정, 회원삭제
- 카드(조회, 등록, 수정(제목, 내용, 담당자, 마감일, 색상, 위치), 삭제), 카드 댓글(조회, 등록, 삭제)

오동현

- 보드(조회, 등록, 수정, 삭제, 초대, 초대된 멤버 조회)

김주희

- 컬럼(조회, 등록, 수정(이름, 위치), 삭제)

방두현

- 프론트 리액트 전담

---

# Code Convention

함수, 변수명 - camelCase
테이블명 - 복수
모델명, 클래스명 - 단수(PaskalCase)
예외 처리 - 커스텀 Error 사용(utils/makeErrorUtil.js)

---

| method | 변수명 |
| :----: | :----: |
|   C    | create |
|   R    |  get   |
|   U    | modify |
|   D    | delete |
