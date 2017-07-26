import { DEFAULT } from './basicTextSchema';
export default LocationSchema = new SimpleSchema({
  locationName: {
    type: String,
    defaultValue: DEFAULT
  },
   latitude:{
     type: Number,
     decimal:true,
     defaultValue: 0
   },
   longitude:{
     type: Number,
     decimal:true,
     defaultValue: 0
   }

});