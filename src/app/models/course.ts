interface ICourse {
  title: string;
  description: string;
  duration: number;
  createdAt: Date;
}

export default class Course implements ICourse {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public duration: number,
        public top: boolean,
        public createdAt: Date,
    ) {}
}
