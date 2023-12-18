
type Role = "user" | "admin";

interface User {
  username: string;
  role: string;
}

interface NewUser extends User {
    userPass: string;
    confirmPass: string;
  }

  const emptyUser: NewUser = {
    role: '',
    username: '',
    userPass: '',
    confirmPass: ''
  };

// type User = {
//     id: ObjectId;
//     username: string;
//     password: string;
//     role: string;
//     reviews: ObjectId[];
//   }

// enum Category {
//   DISTANCE,
//   AREA,
//   VOLUME,
//   TIME,
//   TEMPERATURE,
//   WEIGHT,
//   ANGLE,
//   SPEED,
// }

// interface MeasureUnit {
//   name: string;
//   category: Category;
// }

// interface Task {
//   title: string;
//   description: string;
//   correctAnswer: number;
//   studyPoints: number;
//   level: number;
//   measureUnit: MeasureUnit;
//   imageUrl: string;
//   name: string;
// }


// const emptyTask: Task = {
//   title: '',
//   description: '',
//   correctAnswer: 0,
//   studyPoints: 0,
//   level: 0,
//   measureUnit: {
//     name: '',
//     category: Category.DISTANCE
//   },
//   imageUrl: '',
//   name: ''
// };

// type Movie = {
//   id: ObjectId;
//   title: string;
//   year: number;
//   director: string;
//   description: string;
//   actors: string[];
//   genre: ObjectId;
//   reviews: ObjectId[];
// };

// type Review = {
//   id: string;
//   rating: string;
//   date: Date;
//   text: string;
//   movie: ObjectId;
//   user: ObjectId;
// };

// type Genre = {
//   id: ObjectId;
//   type: string;
//   movies: ObjectId[];
// };



export { emptyUser, emptyTask, type NewUser, type User, type Role, type Task, type MeasureUnit, type Category };