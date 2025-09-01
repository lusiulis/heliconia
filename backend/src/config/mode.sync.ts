import '../models/bill.model';
import '../models/billitem.model';
import '../models/category.model';
import '../models/categoryxproduct.model';
import '../models/itemdescription.model';
import '../models/kitchen.model';
import '../models/option.model';
import '../models/order.model';
import '../models/product.model';
import '../models/section.model';
import '../models/device.model';

import db from './database.config';
import { User } from '../models/user.model';
import { encrypt } from '../utils/encryptation';

export const init = () =>
  db.sync({ alter: true }).then(async () => {
    const admin = await User.findOne({ where: { username: 'admin' } });
    if (!admin) {
      const hashedPassword = await encrypt('defaultPassword');
      await User.create({
        username: 'admin',
        password: hashedPassword,
      });
      console.log('✅ Admin user created with default password');
    }
  });

export default init;
