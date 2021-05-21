let otp = ()=>{
    let random =  `${Math.floor(Math.random()*10000)}`;
    if(random.length<4){
        let key = 4-random.length;
        switch (key) {
            case 1:
                random = random+'1';
                break;
            case 2:
                random = random+'12';
                break;
            default:
                random = random+'123';
                break;
        }
    }

    return random;
    
}

module.exports = otp;