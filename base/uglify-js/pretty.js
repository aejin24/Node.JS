/**
 * uglify는 공백과 문서 서식을 다 파괴시킨다
 * 공백, 엔터 하나하나가 메모리 잡아먹기 떄문에 메모리 낭비를 줄이기 위해 사용하곤 함
 * 
 * 사용법
 * uglifyjs [target file] -o [file name] [-m]
 * 
 * -m은 변수를 랜덤 이름으로 설정해서 바꿔준다
 */

function hello(name) {
    console.log(`Hi ${name}`);
}

hello("aejin")
