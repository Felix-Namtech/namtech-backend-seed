import BaseController from './base/BaseController';
import UserBusiness from '../app/business/UserBusiness';
import IUserBusiness from '../app/business/interfaces/IUserBusiness';
import UserCreate from '../app/model/user/UserCreate';
import UserUpdate from '../app/model/user/UserUpdate';
import UserLogin from '../app/model/user/UserLogin'; // eslint-disable-line
import Authenticator from '../system/Authenticator';

class UserController extends BaseController {
    private userBusiness: IUserBusiness = new UserBusiness();

    constructor() {
        super();

        this.get('/profile', Authenticator.isAuthenticated, this.getProfile.bind(this));
        this.put('/profile', Authenticator.isAuthenticated, this.updateProfile.bind(this));

        this.get('/list/:page', this.getAllUsers.bind(this));
        this.get('/:_id', this.getUserById.bind(this));
        this.post('/signup', this.signup.bind(this));
        this.post('/', Authenticator.isHandlerRoles('Administrator'), this.createUser.bind(this));
        this.put('/:_id', Authenticator.isHandlerRoles('Administrator'), this.updateUser.bind(this));
        this.delete('/:_id', Authenticator.isHandlerRoles('Administrator'), this.deleteUser.bind(this));
    }

    async getAllUsers(req): Promise<any> {
        return await this.userBusiness.getList(req.params.page, 10);
    }

    async getUserById(req): Promise<any> {
        return await this.userBusiness.get(req.params._id);
    }

    async getProfile(req): Promise<any> {
        let userLogin: UserLogin = req[Authenticator.userKey];
        return await this.userBusiness.get(userLogin.user._id);
    }

    async signup(req): Promise<any> {
        return await this.userBusiness.createUserLogin(new UserCreate(req.body));
    }

    async createUser(req): Promise<any> {
        return await this.userBusiness.create(new UserCreate(req.body));
    }

    async updateUser(req): Promise<any> {
        return await this.userBusiness.update(req.params._id, new UserUpdate(req.body));
    }

    async updateProfile(req): Promise<any> {
        let userLogin: UserLogin = req[Authenticator.userKey];
        return await this.userBusiness.update(userLogin.user._id, new UserUpdate(req.body));
    }

    async deleteUser(req): Promise<any> {
        return await this.userBusiness.delete(req.params._id);
    }
}

Object.seal(UserController);
export default UserController;
