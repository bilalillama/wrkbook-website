export const DEFAULT = 'NONE';
export default BasicText = new SimpleSchema({
  text:{
    type:String,
    min:1,
    max:250,
    defaultValue: DEFAULT
  }
});