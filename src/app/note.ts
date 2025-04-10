export interface Note {
    id: number;
    desc: string;
    creationDate: Date;
    modifyDate?: Date;
    isSelected?: boolean;
}
