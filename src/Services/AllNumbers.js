var finalNumber="";

const checkNumber =(num,operation)=>
{
    console.log(finalNumber)
    return operation === undefined ? finalNumber=num : finalNumber=((num)+operation)+finalNumber;
}
const AllOperationValues={
    zero: (param)=>{
        return checkNumber(0,param);
    },
    one :(param)=>{
        return checkNumber(1,param);
    },
    two :(param)=>{
        return checkNumber(2,param);
    },
    three :(param)=>{
        return checkNumber(3,param);
    },
    four :(param)=>{
        return checkNumber(4,param);
    },
    five :(param)=>{
        return checkNumber(5,param);
    },
    six :(param)=>{
        return checkNumber(6,param);
    },
    seven :(param)=>{
        return checkNumber(7,param);
    },
    eight :(param)=>{
        return checkNumber(8,param);
    },
    nine :(param)=>{
        return checkNumber(9,param);
    },
    plus : () =>{
        return '+';
    },
    minus : () =>{
        return '-';
    },
    times :()=>{
        return '*';
    },
    divided_by:()=>{
        return '/';
    },

}

module.exports= AllOperationValues;