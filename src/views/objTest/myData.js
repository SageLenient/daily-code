/*
 * @Author: Yanzhao.Zhang
 * @Date: 2021-06-24 14:26:45
 * @LastEditors: Yanzhao.Zhang
 * @LastEditTime: 2021-07-12 21:23:24
 * @Description:
 */
/* const myObject = {
  name: 'sage',
  age: 18
}

export default myObject */

/* export default {
  ...myObject,
}
 */
class CreateMyObject {
  constructor() {
    this.name = 'sage';
    this.age = 18;
    return this;
  }
}

/* export default {
  ...new CreateMyObject()
} */

export default {
  myObject: new CreateMyObject(),
};

// export default CreateMyObject
