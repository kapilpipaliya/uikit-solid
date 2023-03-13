import {ArticleProps} from "../../../globals";
import {setClassNames} from "../../utils/set-class-names";


export function Article(props: ArticleProps) {
  return (
    <article
      id={props.id}
      style={props.style}
      class={`
                  uk-article
                  ${setClassNames(props)}
              `}
    >
      <h1 class="uk-article-title">{props.title}</h1>
      {props.meta ? <p class="uk-article-meta">{props.meta}</p> : ''}
      {props.lead ? <p class="uk-text-lead">{props.lead}</p> : ''}
      <div>{props.children}</div>
    </article>
  );
}

// export function Article  = (ArticleProps) => {
// 
//     return (
//       <article
//         id={props.id}
//         style={props.style}
//         class={`
//                     uk-article
//                     ${setClassNames(props)}
//                 `}
//       >
//         <h1 class="uk-article-title">{props.title}</h1>
//         {props.meta ? <p class="uk-article-meta">{props.meta}</p> : ''}
//         {props.lead ? <p class="uk-text-lead">{props.lead}</p> : ''}
//         <div>{props.children}</div>
//       </article>
//     )
//   }
// }

export default Article;
