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

export const init = () => db.sync({ alter: true });

export default init;
