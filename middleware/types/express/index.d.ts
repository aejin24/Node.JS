import express from "express";
import { RequestTime } from "../../custom/request";

// 새로 선언한 타입을 global로 설정한 경우 external 모듈이어야하기 때문에 export를 사용하여 에러가 안나도록 한다
// 글로벌 객체를 확장하기 위해서 external, ambient 모듈이어야한다
export {};

declare global {
    namespace Express {
        interface Request {
            requestTime: RequestTime 
        }
    }
}