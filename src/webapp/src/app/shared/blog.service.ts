import {Blog} from "../bloglist/blog/blog.model";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CommentModel} from "../bloglist/blog/blog-detail/comments/comment.model";
import {AuthService} from "./auth.service";

@Injectable()
export class BlogService {
/*  private dummytext = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam minima minus non, quod sapiente veniam? Alias blanditiis deserunt earum eveniet expedita facilis, in modi perspiciatis praesentium quasi ratione unde?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam minima minus non, quod sapiente veniam? Alias blanditiis deserunt earum eveniet expedita facilis, in modi perspiciatis praesentium quasi ratione unde?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam minima minus non, quod sapiente veniam? Alias blanditiis deserunt earum eveniet expedita facilis, in modi perspiciatis praesentium quasi ratione unde?';
  private dummytext2 = 'Meow for food, then when human fills food dish, take a few bites of food and continue meowing push your water glass on the floor damn that dog run in circles, yet thug cat human clearly uses close to one life a night no one naps that long so i revive by standing on chestawaken! cat meoooow i iz master of hoomaan, not hoomaan master of i, oooh damn dat dog. I\'m going to lap some water out of my master\'s cup meow spit up on light gray carpet instead of adjacent linoleum for poop in litter box, scratch the walls. Russian blue sleep in the bathroom sink burrow under covers. Meow and walk away leave hair everywhere sniff catnip and act crazy leave hair everywhere, for human give me attention meow mewl for food at 4am cat ass trophy. Meowing non stop for food hit you unexpectedly bite the neighbor\'s bratty kid spend six hours per day washing, but still have a crusty butthole or i heard this rumor where the humans are our owners, pfft, what do they know?!. Cats secretly make all the worlds muffins my water bowl is clean and freshly replenished, so i\'ll drink from the toilet. Russian blue cat slap dog in face lick yarn hanging out of own butt so reward the chosen human with a slow blink. Human give me attention meow run around the house at 4 in the morning i heard this rumor where the humans are our owners, pfft, what do they know?! but lick butt cat snacks. The dog smells bad. Throw down all the stuff in the kitchen. I just saw other cats inside the house and nobody ask me before using my litter box instantly break out into full speed gallop across the house for no reason hide head under blanket so no one can see stare out cat door then go back inside present belly, scratch hand when stroked. Pooping rainbow while flying in a toasted bread costume in space twitch tail in permanent irritation, groom forever, stretch tongue and leave it slightly out, blep. Hunt anything that moves your pillow is now my pet bed for floof tum, tickle bum, jellybean footies curly toes but you call this cat food being gorgeous with belly side up steal the warm chair right after you get up. Lick human with sandpaper tongue purr while eating, so russian blue scratch the furniture. Rub face on everything hide when guests come over, touch water with paw then recoil in horror sniff other cat\'s butt and hang jaw half open thereafter i can haz. Push your water glass on the floor claw at curtains stretch and yawn nibble on tuna ignore human bite human hand love blinks and purr purr purr purr yawn, i\'m going to lap some water out of my master\'s cup meow and that box? i can fit in that box. Please stop looking at your phone and pet me trip on catnip litter kitter kitty litty little kitten big roar roar feed me. Lie in the sink all day always ensure to lay down in such a manner that tail can lightly brush human\'s nose . Snuggles up to shoulders or knees and purrs you to sleep white cat sleeps on a black shirt inspect anything brought into the house, so you are a captive audience while sitting on the toilet, pet me nya nya nyan. Meow meow mama weigh eight pounds but take up a full-size bed scratch at fleas, meow until belly rubs, hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food hiss at vacuum cleaner and carefully drink from water glass and then spill it everywhere and proceed to lick the puddle for attack feet. Throw down all the stuff in the kitchen walk on car leaving trail of paw prints on hood and windshield. ';
  private dummypic = 'https://images.unsplash.com/photo-1478700485868-972b69dc3fc4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
  private dummypic2 = 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1402&q=80';
  private dummyComment = [{name: 'Name', email:'meinemail@web.de', commentText:'dummyText'}];*/
  /*private homeBigPic = 'https://images.unsplash.com/photo-1535725967168-fbfdcdab1f21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80';
  */
  onChangedDetail = new Subject();


/*  private bloglist: Blog[] = [new Blog( 'Schweden - Malmö', 'https://images.unsplash.com/photo-1506701160839-34cfdecaf53c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    new Date(Date.now()),'Reisen',[{paragraphPic: 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', paragraphTitle: 'Untertitel', paragraphText: this.dummytext2 }], this.dummyComment),
    new Blog('Schweden - Malmö', 'https://images.unsplash.com/photo-1529426944611-e8342e2e91c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      new Date(Date.now()),'Reisen',[{paragraphPic: this.dummypic, paragraphTitle: 'Untertitel', paragraphText: this.dummytext },
        {paragraphPic: this.dummypic2, paragraphTitle: '', paragraphText: this.dummytext }], this.dummyComment),
    new Blog( 'Schweden - Malmö', 'https://images.unsplash.com/photo-1520900252116-d564c06d399a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1268&q=160',
      new Date(Date.now()),'Reisen',[{paragraphPic: 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', paragraphTitle: 'Untertitel', paragraphText: 'Wir waren da und es war gut. lorem ' }], this.dummyComment)
  ];*/

  constructor(private http: HttpClient,
              private authService: AuthService) {}

  getBlogs(){
    return this.http.get('http://localhost:3000/api/blogs');
  }

  getBlog(id: string){
    console.log('Get Blog id: ' + id);
    return this.http.get('http://localhost:3000/api/blogs/' + id);
  }

  add(newBlog: Blog) {
    let headers = new Headers();
    const token = this.authService.getToken();
    headers.append('Authorization', token);
    return this.http.post('http://localhost:3000/api/blogs/', newBlog);
  }

  update(id: string, blog: Blog) {
    return this.http.patch('http://localhost:3000/api/blogs/' + id, blog);
  }

  delete(id: string) {
    return this.http.delete('http://localhost:3000/api/blogs/' + id);
  }

  addComment(id: string, comment: CommentModel) {
    return this.http.patch('/api/comments/' + id, comment);
  }

}
