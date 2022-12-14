import express from "express";
// import  {getDatabaseTest, getClubMemberList} from "./memberController";
const member = require("./memberController");
const adminJwtMiddleWare = require("../../../config/adminJwtMiddleWare");

const memberRouter = express.Router();

// Route Test
memberRouter.get("/db", member.getDatabaseTest);

/*
    ๊ฐ๋ฐ ๋ธํธ (8/12) ๐
    jwtMiddleWare ๋ฅผ ํต๊ณผํ๋ค๋ ์๋ฏธ๋ ๋ก๊ทธ์ธ์ ์ฑ๊ณตํด์ ํค๋์ jwt ํ ํฐ์ ์ ๊ณตํ ์ํฉ์.

    - authController
    jwt token์ ๋ก๊ทธ์ธํ๋ฉด ๋ฐ๊ธ์ ํด์ค๋ค.
    ์ฌ๊ธฐ์ jwt token์ ์ด๋๋ฏผ์ ๊ณ์ ์ํ๊ฐ ACTIVE ์ด๋ฉด์, {์ด๋ฉ์ผ, ๋น๋ฐ๋ฒํธ}๊ฐ ์ผ์นํ  ๋ ๋ฐ๊ธ์ ์ํํ๋ค.

    - jwtMiddleWare
    ๋ฐ๊ธ ๋ฐ์ jwt token์ jwtMiddleWare์์ ์ฌ๋ฐ๋ฅธ token์ธ์ง ๊ฒ์ฆ์ ์งํํ๋ค.
    ๋ฐ๋ผ์, jwtMiddleWare ๋ฅผ ํต๊ณผํ ๊ฑด ACTIVE ์ํ(๋๋ค ์น์ ๋ฑ๋ก๋ ์ด๋๋ฏผ)์ธ ์ด๋๋ฏผ ํด๋ผ์ด์ธํธ๊ฐ ์ ๊ทผ์ ํ๋ค๋ฅผ ์๋ฏธํ๋ค.

        ๊ทธ๋ ๊ธฐ์, ์ด๋๋ฏผ side์ API์์ ํ์ํ Validation์ ๊ธฐ๋กํ๋ค.
        - ๋ก๊ทธ์ธ ํ ์ด๋๋ฏผ์ด ์์ ์ ๊ถํ์ ๋ง๋ API ์์ฒญ์ ํ๋์ง์ ๋ํ Validation ํ์
*/

// 3.1 ๋จ์ฒด ๋ชจ๋  ํ์๋ช๋จ ๋ฆฌ์คํธ ์กฐํ API
/**
 * @swagger
 * paths:
 *  /admin/member?adminIdx={adminIdx}&page={page}&pageSize={pageSize}:
 *   get:
 *     tags: [ADMIN ํ์ ๋ช๋จ]
 *     summary: ๋จ์ฒด ๋ชจ๋  ํ์๋ช๋จ ๋ฆฌ์คํธ ์กฐํ API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: ๋์๋ฆฌ ์ธ๋ฑ์ค
 *         - in: query
 *           name: page
 *           securitySchemes:
 *              type: integer
 *           default: 1
 *           required: true
 *           description: ์กฐํํ  ํ์ด์ง ์ชฝ ์
 *         - in: query
 *           name: pageSize
 *           securitySchemes:
 *              type: integer
 *           default: 10
 *           required: true
 *           description: ํ ํ์ด์ง์ ์กฐํํ  ๋ฐ์ดํฐ ์
 *         - in: header
 *           name: x-access-token
 *           description: ํค๋์ JWT_adminIdx ํ ํฐ์ ์๋ ฅํ์ธ์
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple     
 *     responses:
 *       "1000":
 *         description: ๋จ์ฒด ๋ชจ๋  ํ์๋ช๋จ ๋ฆฌ์คํธ ์กฐํ API ์ฑ๊ณต
 *       "2001":
 *         description: ํ๋ผ๋ฏธํฐ(adminIdx)๋ฅผ ์๋ ฅํ์ธ์.
 *       "2002":
 *         description: adminIdx๋ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "2003":
 *         description: ์ ํจํ์ง ์์ adminIdx์๋๋ค. (INACTIVE or DELETED)
 *       "5000":
 *         description: ๋ฐ์ดํฐ ๋ฒ ์ด์ค ์๋ฌ
 *
 */
memberRouter.get("/",adminJwtMiddleWare ,member.getClubMemberList);


// 3.2 ํ์ ์์ธ ์กฐํ API
/**
 * @swagger
 * paths:
 *  /admin/member/info?userIdx={userIdx}&adminIdx={adminIdx}:
 *   get:
 *     tags: [ADMIN ํ์ ๋ช๋จ]
 *     summary: ํ์ ์์ธ ์กฐํ API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 6
 *           required: true
 *           description: ์ ์  ์ธ๋ฑ์ค
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: ๋์๋ฆฌ ์ธ๋ฑ์ค
 *         - in: header
 *           name: x-access-token
 *           description: ํค๋์ JWT_adminIdx ํ ํฐ์ ์๋ ฅํ์ธ์
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: ๋จ์ฒด ๋ชจ๋  ํ์๋ช๋จ ๋ฆฌ์คํธ ์กฐํ API ์ฑ๊ณต
 *       "3000":
 *         description: ํ๋ผ๋ฏธํฐ(userIdx)๋ฅผ ์๋ ฅํ์ธ์.
 *       "3001":
 *         description: userIdx๋ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "3002":
 *         description: ์ ํจํ์ง ์์ userIdx์๋๋ค. (INACTIVE or DELETED or NULL[๋์๋ฆฌ์ ์ํ์ง ์์ ํ์ or ๋๋ค ์น์ ์กด์ฌํ์ง ์์ ํ์])
 *       "5000":
 *         description: ๋ฐ์ดํฐ ๋ฒ ์ด์ค ์๋ฌ
 *
 */
memberRouter.get("/info",adminJwtMiddleWare ,member.getMemberInfo);




// 3.3 ํ์ ์ญ์ ํ๊ธฐ
// Query String
// JWT Token ์ ์ฉํ๊ณ  ์งํ
/**
 * @swagger
 * paths:
 *  /admin/member?userIdx={userIdx}&adminIdx={adminIdx}:
 *   patch:
 *     tags: [ADMIN ํ์ ๋ช๋จ]
 *     summary: ํ์ ์ญ์  API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 3
 *           required: true
 *           description: ์ ์  ์ธ๋ฑ์ค
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: ๋์๋ฆฌ ์ธ๋ฑ์ค
 *         - in: header
 *           name: x-access-token
 *           description: ํค๋์ JWT_adminIdx ํ ํฐ์ ์๋ ฅํ์ธ์
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: ํ์ ์ญ์  API ์ฑ๊ณต
 *       "3000":
 *         description: ํ๋ผ๋ฏธํฐ(userIdx)๋ฅผ ์๋ ฅํ์ธ์.
 *       "3001":
 *         description: userIdx๋ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "3002":
 *         description: ์ ํจํ์ง ์์ userIdx์๋๋ค. (INACTIVE or DELETED or NULL[๋์๋ฆฌ์ ์ํ์ง ์์ ํ์ or ๋๋ค ์น์ ์กด์ฌํ์ง ์์ ํ์])
 *       "5000":
 *         description: ๋ฐ์ดํฐ ๋ฒ ์ด์ค ์๋ฌ
 *
 */
memberRouter.patch("/",adminJwtMiddleWare ,member.patchMember);



// 3.4 ๋์๋ฆฌ์ ํ์ ํ/์กฐ ์นดํ๊ณ ๋ฆฌ ์ถ๊ฐํ๊ธฐ
/**
 * @swagger
 * paths:
 *  /admin/member/update/{adminIdx}:
 *   post:
 *     tags: [ADMIN ํ์ ๋ช๋จ]
 *     summary: ๋์๋ฆฌ์ ํ์ ํ/์กฐ ์นดํ๊ณ ๋ฆฌ ์ถ๊ฐ API
 *     parameters:
 *         - in: path
 *           name: adminIdx
 *           Schemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: ๋์๋ฆฌ ์ธ๋ฑ์ค
 *         - in: body
 *           name: ClubTeamList
 *           description: ํ/์กฐ ํ๋ผ๋ฏธํฐ
 *           schema:
 *              type: object
 *              required:
 *                - teamName
 *              properties:
 *                    teamName:
 *                        description: ํ/์กฐ ์ด๋ฆ
 *                        type: string
 *         - in: header
 *           name: x-access-token
 *           description: ํค๋์ JWT_adminIdx ํ ํฐ์ ์๋ ฅํ์ธ์
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: ๋์๋ฆฌ์ ํ์ ํ/์กฐ ์นดํ๊ณ ๋ฆฌ ์ถ๊ฐ API ์ฑ๊ณต
 *       "2001":
 *         description: ํ๋ผ๋ฏธํฐ(adminIdx)๋ฅผ ์๋ ฅํ์ธ์.
 *       "2002":
 *         description: adminIdx๋ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "2004":
 *         description: teamName์ ์๋ ฅํด์ฃผ์ธ์.
 *       "2005":
 *         description: teamName์ 40์ ์ด๋ด๋ก ์๋ ฅ๊ฐ๋ฅํฉ๋๋ค.
 *       "5000":
 *         description: ๋ฐ์ดํฐ ๋ฒ ์ด์ค ์๋ฌ
 *       "6000":
 *         description: ์ ๊ทผํ  ์ ์๋ ๋์๋ฆฌ์๋๋ค. ๋ณธ์ธ ๋์๋ฆฌ์ ๋ํด์๋ง ์ ๊ทผํ์ธ์.
 *
 */
memberRouter.post("/update/:adminIdx", adminJwtMiddleWare, member.postClubTeam);

// 3.5 ๋์๋ฆฌ ์์ํ์ ํ/์กฐ ์นดํ๊ณ ๋ฆฌ ์ ์ฉํ๊ธฐ
/**
 * @swagger
 * paths:
 *  /admin/member/update?userIdx={userIdx}&adminIdx={adminIdx}:
 *   patch:
 *     tags: [ADMIN ํ์ ๋ช๋จ]
 *     summary: ๋์๋ฆฌ์ ํ์ ํ/์กฐ ์นดํ๊ณ ๋ฆฌ ์ ์ฉ API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           default: 3
 *           required: true
 *           description: ์ ์  ์ธ๋ฑ์ค
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: ๋์๋ฆฌ ์ธ๋ฑ์ค
 *         - in: body
 *           name: ClubTeamList
 *           description: ํ/์กฐ ํ๋ผ๋ฏธํฐ
 *           schema:
 *              type: object
 *              required:
 *                - clubTeamListIdx
 *              properties:
 *                    clubTeamListIdx:
 *                        description: ํ/์กฐ ์ธ๋ฑ์ค
 *                        type: int
 *                        default: 11
 *         - in: header
 *           name: x-access-token
 *           description: ํค๋์ JWT_adminIdx ํ ํฐ์ ์๋ ฅํ์ธ์
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: ๋์๋ฆฌ ์์ํ์ ํ/์กฐ ์นดํ๊ณ ๋ฆฌ ์ ์ฉ API ์ฑ๊ณต
 *       "3000":
 *         description: ํ๋ผ๋ฏธํฐ(userIdx)๋ฅผ ์๋ ฅํ์ธ์.
 *       "3001":
 *         description: userIdx๋ฅผ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "2001":
 *         description: ํ๋ผ๋ฏธํฐ(adminIdx)๋ฅผ ์๋ ฅํด์ฃผ์ธ์.
 *       "2002":
 *         description: adminIdx๋ฅผ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "2006":
 *         description: ํ๋ผ๋ฏธํฐ(clubTeamListIdx)๋ฅผ ์๋ ฅํด์ฃผ์ธ์.
 *       "2007":
 *         description: clubTeamListIdx๋ฅผ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "2008":
 *         description: ์ ํจํ์ง ์์ userIdx์๋๋ค. [INACTIVE or DELETED or NULL[๋์๋ฆฌ์ ์ํ์ง ์์ ํ์ or ๋๋ค ์น์ ์กด์ฌํ์ง ์์ ํ์]
 *       "3002":
 *         description: ์ ํจํ์ง ์์ clubTeamListIdx์๋๋ค. [INACTIVE or DELETED or NULL[๋์๋ฆฌ์ ์ํ์ง ์์ ํ/์กฐ ์นดํ๊ณ ๋ฆฌ]
 *       "5000":
 *         description: ๋ฐ์ดํฐ ๋ฒ ์ด์ค ์๋ฌ
 *       "6000":
 *         description: ์ ๊ทผํ  ์ ์๋ ๋์๋ฆฌ์๋๋ค. ๋ณธ์ธ ๋์๋ฆฌ์ ๋ํด์๋ง ์ ๊ทผํ์ธ์.
 *
 */
memberRouter.patch("/update", adminJwtMiddleWare, member.patchMemberClubTeam);


// ์ถ๊ฐ API
// 3.6 ๋์๋ฆฌ ๋ง์ดํ์ด์ง ์ ๋ณด ์์ ํ๊ธฐ
/**
 * @swagger
 * paths:
 *  /admin/member/mypage?adminIdx={adminIdx}:
 *   patch:
 *     tags: [ADMIN ํ์ ๋ช๋จ]
 *     summary: ๋์๋ฆฌ์ ๋ง์ดํ์ด์ง ์์  API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: ๋์๋ฆฌ ์ธ๋ฑ์ค
 *         - in: body
 *           name: ClubTeamList
 *           description: ๋ง์ดํ์ด์ง ์์  ํ๋ผ๋ฏธํฐ
 *           schema:
 *              type: object
 *              required:
 *                - clubName
 *                - establishmentYea
 *                - clubRegion
 *                - clubWebLink
 *                - clubIntroduction
 *                - clubCategoryIdx
 *              properties:
 *                    clubName:
 *                        description: ๋์๋ฆฌ ์ด๋ฆ
 *                        type: string
 *                        default: "๋งํ"
 *                    establishmentYear:
 *                        description: ๋์๋ฆฌ ์ค๋ฆฝ ์ฐ๋
 *                        type: date
 *                        default: "2022-03-07"
 *                    clubRegion:
 *                        description: ๋์๋ฆฌ ํ๋ ์ง์ญ
 *                        type: string
 *                        default: "์์ฐ/์๋ฆฌ์นด"
 *                    clubWebLink:
 *                        description: ๋์๋ฆฌ ์น ์ฌ์ดํธ
 *                        type: string
 *                        default: "http://maha.com"
 *                    clubIntroduction:
 *                        description: ๋์๋ฆฌ ์๊ฐ
 *                        type: string
 *                        default: "๋งํ์ ์๋๋ก ํํํ ์๋ฆฌ์นด ๋ถ์ง์์ ๋ณด๋๋ฅผ ํ๋ ๋์๋ฆฌ์๋๋ค."
 *                    clubCategoryIdx:
 *                        description: ๋์๋ฆฌ ์นดํ๊ณ ๋ฆฌ ์ธ๋ฑ์ค
 *                        type: int
 *                        default: 1
 * 
 *         - in: header
 *           name: x-access-token
 *           description: ํค๋์ JWT_adminIdx ํ ํฐ์ ์๋ ฅํ์ธ์
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: ๋์๋ฆฌ์ ๋ง์ดํ์ด์ง ์์  API ์ฑ๊ณต
 *       "3000":
 *         description: ํ๋ผ๋ฏธํฐ(userIdx)๋ฅผ ์๋ ฅํ์ธ์.
 *       "3001":
 *         description: userIdx๋ฅผ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "2001":
 *         description: ํ๋ผ๋ฏธํฐ(adminIdx)๋ฅผ ์๋ ฅํด์ฃผ์ธ์.
 *       "2002":
 *         description: adminIdx๋ฅผ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "2006":
 *         description: ํ๋ผ๋ฏธํฐ(clubTeamListIdx)๋ฅผ ์๋ ฅํด์ฃผ์ธ์.
 *       "2007":
 *         description: clubTeamListIdx๋ฅผ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "2008":
 *         description: ์ ํจํ์ง ์์ userIdx์๋๋ค. [INACTIVE or DELETED or NULL[๋์๋ฆฌ์ ์ํ์ง ์์ ํ์ or ๋๋ค ์น์ ์กด์ฌํ์ง ์์ ํ์]
 *       "3002":
 *         description: ์ ํจํ์ง ์์ clubTeamListIdx์๋๋ค. [INACTIVE or DELETED or NULL[๋์๋ฆฌ์ ์ํ์ง ์์ ํ/์กฐ ์นดํ๊ณ ๋ฆฌ]
 *       "5000":
 *         description: ๋ฐ์ดํฐ ๋ฒ ์ด์ค ์๋ฌ
 *       "6000":
 *         description: ์ ๊ทผํ  ์ ์๋ ๋์๋ฆฌ์๋๋ค. ๋ณธ์ธ ๋์๋ฆฌ์ ๋ํด์๋ง ์ ๊ทผํ์ธ์.
 *
 */
memberRouter.patch("/mypage", adminJwtMiddleWare, member.patchMyPage);

// 3.7 ์ด๋๋ฏผ์ ๋์๋ฆฌ ๋ฉ์ธ ํ ์ ๋ณด ์กฐํ API
/**
 * @swagger
 * paths:
 *  /admin/member/mainhome?adminIdx={adminIdx}:
 *   get:
 *     tags: [ADMIN ํ์ ๋ช๋จ]
 *     summary: ์ด๋๋ฏผ์ ๋์๋ฆฌ ๋ฉ์ธํ ์ ๋ณด ์กฐํ API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: ๋์๋ฆฌ ์ธ๋ฑ์ค
 *         - in: header
 *           name: x-access-token
 *           description: ํค๋์ JWT_adminIdx ํ ํฐ์ ์๋ ฅํ์ธ์
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: ์ด๋๋ฏผ์ ๋์๋ฆฌ ๋ฉ์ธํ ์ ๋ณด ์กฐํ API ์ฑ๊ณต
 *       "3000":
 *         description: ํ๋ผ๋ฏธํฐ(userIdx)๋ฅผ ์๋ ฅํ์ธ์.
 *       "3001":
 *         description: userIdx๋ฅผ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "3008":
 *         description: ๋๋ค ์น์์ ์ ํจํ์ง ์์ userIdx์๋๋ค (ํํดํ ํ์ or ๋นํ์ฑํ ํ ํ์).
 *       "6003":
 *         description: userIdx๊ฐ ์๋ ฅํ์  ํ ํฐ๊ณผ ๋ค๋ฆ๋๋ค. ๋ณธ์ธ์ userIdx์ ๋ํด์๋ง ์ ๊ทผํ์ธ์.
 *       "5000":
 *         description: ๋ฐ์ดํฐ ๋ฒ ์ด์ค ์๋ฌ
 *
 */
memberRouter.get("/mainhome", adminJwtMiddleWare, member.getAdminMainhome);


// 3.8 ์ด๋๋ฏผ์ ๋์๋ฆฌ ๋ง์ดํ์ด์ง ์ ๋ณด ์กฐํ API
/**
 * @swagger
 * paths:
 *  /admin/member/mypage?adminIdx={adminIdx}:
 *   get:
 *     tags: [ADMIN ํ์ ๋ช๋จ]
 *     summary: ์ด๋๋ฏผ์ ๋์๋ฆฌ ๋ง์ดํ์ด์ง ์ ๋ณด ์กฐํ API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           default: 12
 *           required: true
 *           description: ๋์๋ฆฌ ์ธ๋ฑ์ค
 *         - in: header
 *           name: x-access-token
 *           description: ํค๋์ JWT_adminIdx ํ ํฐ์ ์๋ ฅํ์ธ์
 *           required: true
 *           default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxMiwiaWF0IjoxNjYwOTA1NDEzLCJleHAiOjE2OTI0NDE0MTMsInN1YiI6IkFkbWluIn0.AUfoVFxe1OWJXFq9-k2n7W_t17_bgcDlGBNZsnimlA0
 *           schema:
 *               type: string
 *           examples:
 *              Sample:
 *                 value: JWT_token
 *                 summary: JWT_token_adminIdx
 *           style: simple
 *     responses:
 *       "1000":
 *         description: ์ด๋๋ฏผ์ ๋์๋ฆฌ ๋ง์ดํ์ด์ง ์ ๋ณด ์กฐํ API ์ฑ๊ณต
 *       "3000":
 *         description: ํ๋ผ๋ฏธํฐ(userIdx)๋ฅผ ์๋ ฅํ์ธ์.
 *       "3001":
 *         description: userIdx๋ฅผ 0๋ณด๋ค ํฐ ๊ฐ์ผ๋ก ์๋ ฅํด์ฃผ์ธ์.
 *       "3008":
 *         description: ๋๋ค ์น์์ ์ ํจํ์ง ์์ userIdx์๋๋ค (ํํดํ ํ์ or ๋นํ์ฑํ ํ ํ์).
 *       "6003":
 *         description: userIdx๊ฐ ์๋ ฅํ์  ํ ํฐ๊ณผ ๋ค๋ฆ๋๋ค. ๋ณธ์ธ์ userIdx์ ๋ํด์๋ง ์ ๊ทผํ์ธ์.
 *       "5000":
 *         description: ๋ฐ์ดํฐ ๋ฒ ์ด์ค ์๋ฌ
 *
 */
memberRouter.get("/mypage", adminJwtMiddleWare, member.getAdminMypageInfo);


export default memberRouter;