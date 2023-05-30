type id = string;

type Options = {}

type fun = void;

type Time = number;
type Track = [x: number, y: number, t: Time]


class Mask {

  window: Window;
  options: Options;

  tracked: {
    id: id,
    cursor: Track[],
    scroll: Track[],
    clicks: Track[]
  } = {
      id: "",
      cursor: [
        [0, 0, 0],
      ],
      scroll: [
        [0, 0, 0],
      ],
      clicks: [
        [0, 0, 0]
      ]
    }

  constructor(m: id, a: Window, s: Options, _k: fun) {
    this.tracked.id = m;
    this.window = a;
    this.options = s;
  }

  // private _throttle(fn: Function, wait: number = 0.2e3) {
  //   let inThrottle: boolean, lastFn: number | undefined, lastTime: number;
  //   return (...args: any[]) => {
  //     const context = this;
  //     if (!inThrottle) {
  //       fn.apply(context, ...args);
  //       lastTime = Date.now();
  //       inThrottle = true;
  //     } else {
  //       clearTimeout(lastFn);
  //       lastFn = setTimeout(function () {
  //         if (Date.now() - lastTime >= wait) {
  //           fn.apply(context, ...args);
  //           lastTime = Date.now();
  //         }
  //       }, Math.max(wait - (Date.now() - lastTime), 0));
  //     }
  //   };
  // };

  mouseTrack() {

    // const tracker = this._throttle(
    //   ({ clientX, clientY }: MouseEvent) => {
    //     this.tracked.cursor.push([clientX, clientY, Date.now()]);
    //   }
    // )

    this.window.addEventListener('mousemove',
      ({ clientX, clientY }: MouseEvent) => {
        this.tracked.cursor.push([clientX, clientY, Date.now()]);
      }
    )
  }

  scrollTrack() {

    // const tracker = this._throttle(
    //   (event: Event) => {
    //     console.log(event, "scroll")
    //     this.tracked.scroll.push([this.window.scrollX, this.window.scrollY, Date.now()]);
    //   }
    // )

    this.window.addEventListener('scroll',
      () => {
        this.tracked.scroll.push([this.window.scrollX, this.window.scrollY, Date.now()]);
      }
    )
  }

  clickTrack() {

    // const tracker = this._throttle(
    //   ({ clientX, clientY }: PointerEvent) => {
    //     console.log(clientX, clientY, 'click');
    //     this.tracked.clicks.push([clientX, clientY, Date.now()]);
    //   }
    // )

    this.window.addEventListener('click',
      ({ clientX, clientY }) => {
        console.log(clientX, clientY, 'click');
        this.tracked.clicks.push([clientX, clientY, Date.now()]);
      }
    )
  }

  async send() {
    const r = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify(this.tracked),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(r);
  }

  periodicSend() {
    setInterval(() => {
      this.send();
    }, 1e3)
  }

  start() {
    this.mouseTrack();
    this.scrollTrack();
    this.clickTrack();
    this.periodicSend();
  }

}

let MASK: Mask;  // singleton pattern

function $(m: id, a: Window, s: Options, k: fun) {
  if (!MASK) {
    MASK = new Mask(m, a, s, k);
  }
  MASK.start();
  return MASK;
}

export default $;