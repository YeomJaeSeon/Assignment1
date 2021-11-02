import { UserService } from '../app/service/user.service';
import connection from './typeorm.connection';

let userService: UserService;

beforeAll(async ()=>{
  await connection.create()
  userService = new UserService();
});

afterAll(async ()=>{
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

// == create User test == //
describe('createUser test', () => {
    it('회원 생성 - 성공',  async () => {
        //given
        const userRequestDto = {
            email : "test@naver.com",
            password : "encrytedPwd",
            token : "0"
        }

        //when
        const responseDto = await userService.createUser(userRequestDto);

        //then
        expect(responseDto.exUser).toBeUndefined();
        expect(responseDto.newUser.email).toEqual("test@naver.com");
        expect(responseDto.newUser.password).toEqual("encrytedPwd")
        expect(responseDto.newUser.token).toEqual("0")
    })

    it('회원 생성 - 실패_이메일 중복', async() => {
        //given
        const userRequestDto = {
            email : "test@naver.com",
            password : "encrytedPwd",
            token : "0"
        }

        await userService.createUser(userRequestDto);
        
        //when
        const responseDto = await userService.createUser(userRequestDto);

        //then
        expect(responseDto.newUser).toBeUndefined();
        expect(responseDto.exUser.email).toEqual("test@naver.com");
        expect(responseDto.exUser.password).toEqual("encrytedPwd")
        expect(responseDto.exUser.token).toEqual("0")
    })
})

// == findUserByEmail == //
describe('findUserByEmail test', () => {
    it('이메일로 회원 조회',  async () => {
        //given
        const userRequestDto = {
            email : "test@naver.com",
            password : "encrytedPwd",
            token : "0"
        }

        await userService.createUser(userRequestDto);

        //when
        const foundUser = await userService.findUserByEmail("test@naver.com")
        
        //then
        expect(foundUser.email).toEqual("test@naver.com")
        expect(foundUser.password).toEqual("encrytedPwd")
        expect(foundUser.token).toEqual("0");
    })
})

// == findUserById == //
describe('findUserById test', () => {

    it('아이디로 회원 조회', async () => {
            //given
    const userRequestDto = {
        email : "test@naver.com",
        password : "encrytedPwd",
        token : "0"
    }

    const user = await userService.createUser(userRequestDto);

    console.log("user");
    console.log(user);

    const id: number = user.newUser.id;

    //when
    const foundUser = await userService.findUserById(id);

    //then
    expect(foundUser.email).toEqual("test@naver.com")
    expect(foundUser.password).toEqual("encrytedPwd")
    expect(foundUser.token).toEqual("0");
    })
})

