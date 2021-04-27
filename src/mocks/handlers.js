import { graphql } from 'msw';

export const handlers = [
    graphql.query('albums', (req, res, ctx) => {

        console.log(req);
        return res(ctx.data({
            data: {
                albums: [
                    { id: '0', title: 'title-0', user: { id: '0', username: 'username-0' } }
                ]
            }
        }))
    })
]