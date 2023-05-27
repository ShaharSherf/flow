// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;

export default async function comments(req: NextApiRequest, res: NextApiResponse) {  
  const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
    }
  `;

  const bodyAsObj = JSON.parse(req.body)
  const result = await graphQLClient.request(query, {
    name: bodyAsObj.name,
    email: bodyAsObj.email,
    comment: bodyAsObj.comment,
    slug: bodyAsObj.slug,
  });

  return res.status(200).send(result);
}

