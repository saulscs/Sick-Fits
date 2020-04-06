const Mutations = {
    createDog(parent, args, ctx,info){
        global.dogs = global.dogs || []
        //create dogs
        const newDog = {name: args.name}
        console.log(args)
        return newDog
    }
};

module.exports = Mutations;
