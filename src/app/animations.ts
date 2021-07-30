import { trigger, animate, transition, style, group, query } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [

  // Slide transition:
  // transition('* => *', [
  //   query(':enter, :leave', style({ position: 'fixed', width: '100%' })
  //     , { optional: true }),
  //   group([
  //     query(':enter', [
  //       style({ transform: 'translateX(-100%)' }),
  //       animate('0.4s ease-in-out', style({ transform: 'translateX(0%)' }))
  //     ], { optional: true }),
  //     query(':leave', [
  //       style({ transform: 'translateX(0%)' }),
  //       animate('0.4s ease-in-out', style({ transform: 'translateX(100%)' }))
  //     ], { optional: true }),
  //   ])
  // ])


  // Fade transition:
  transition('* => *', [
    query(':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }),

    group([
      query(':enter',
        [
          style({ opacity: 0 })
        ],
        { optional: true }
      ),
      query(':leave',
        [
          style({ opacity: 1 }),
          animate('0.2s',
            style({ opacity: 0 }))
        ],
        { optional: true }
      ),

      query(':enter',
        [
          style({ opacity: 0 }),
          animate('0.2s',
            style({ opacity: 1 }))
        ],
        { optional: true }
      )
    ])
  ])
]);
