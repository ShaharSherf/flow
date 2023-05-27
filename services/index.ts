import { graphql } from 'graphql';
import { request, gql } from 'graphql-request';

const graphqlAPI: string = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;

export const getPosts = async () => {
    const query = gql`
    query GetPosts {
        postsConnection {
          edges {
            node {
              author {
                bio
                id
                name
                photo {
                  url
                }
              }
              createdAt
              excert
              slug
              title
              featureImage {
                url
              }
              catagories {
                name
                stage
              }
            }
          }
        }
    }
    `
    const results: any = await request(graphqlAPI, query)
    return results.postsConnection.edges
};

export const getPostDetails = async (slug: string) => {
    const query = gql`
    query GetPostDetails($slug: String!) {
        post(where: {slug: $slug}) {
            author {
                bio
                id
                name
                photo {
                    url
                }
            }
            createdAt
            excert
            slug
            title
            featureImage {
            url
            }
            catagories {
                name
                stage
                slug
            }
            content {
                raw
            }
        }
    }
    `
    const results: any = await request(graphqlAPI, query, { slug })
    return results.post
};

export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featureImage {
                    url
                }
                createdAt
                slug
            }
        }

    `
    const results: any = await request(graphqlAPI, query)
    return results.posts
}

export const getSimilarPosts = async (categories: undefined | Array<any>, slug: undefined | string) => {
    const query = gql`
      query GetPostDetails($slug: String!, $categories: [String]) {
        posts(
          where: {slug_not: $slug, AND: {catagories_some: {slug_in: $categories}}}
          last: 3
        ) {
          title
          featureImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const result: any = await request(graphqlAPI, query, { slug, categories });

    return result.posts;
};

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            catagories {
                name
                slug
            }
        }
    `
    const results: any = await request(graphqlAPI, query)
    return results.catagories
}

export const submitComment = async (commentObj: any) => {
    const result = await fetch('/api/comments', {
        method: "POST",
        body: JSON.stringify(commentObj),
    });
    return result.json();
}

export const getComments = async (slug: string) => {
    const query = gql`
        query GetSlug($slug: String!) {
            comments(where: {post: {slug: $slug}}){
                name
                createdAt
                comment
            }
        }
    `
    const results: any = await request(graphqlAPI, query, {slug})
    return results.comments
}

export const getCategoryPost = async (slug: string) => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {catagories_some: {slug: $slug}}) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excert
              featureImage {
                url
              }
              catagories {
                name
                slug
              }
            }
          }
        }
      }
    `;
  
    const result: any = await request(graphqlAPI, query, { slug });
  
    return result.postsConnection.edges;
  };
  