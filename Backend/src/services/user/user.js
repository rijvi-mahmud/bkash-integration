export default async function user() {

    // Routes
    this.route.get('/user', (req,res)=>res.send('Hello World'));
}