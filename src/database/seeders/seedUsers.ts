import userFactory from '../factories/userFactory';
import { userServices } from '../../services/UserServices';
import { promisify } from '../../utils';

export default async function seedUsers(amount: number = 10): Promise<any> {
    const users = userFactory(amount);
    console.log('=> Seeding users table');

    const userList = users.map(async user => {
        const [newUser, newUserErr] = await promisify(
            userServices.create(user),
        );
        if (newUserErr) {
            console.log(newUserErr);

            return null;
        }

        return newUser;
    });

    return Promise.resolve(Promise.all([...userList]));
}
