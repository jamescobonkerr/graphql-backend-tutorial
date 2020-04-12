const { GraphQLServer } = require("graphql-yoga");

const links = {
  "link-0": {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
};

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => Object.values(links),
    link: (parent, args) => links[args.id], // TODO: Handle not found
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links[link.id] = link;
      return link;
    },
    updateLink: (parent, args) => {
      links[args.id] = {
        // TODO: Handle not found
        ...links[args.id],
        ...args,
      };
      return links[args.id];
    },
    deleteLink: (parent, args) => {
      const link = links[args.id];
      delete links[args.id];
      return link;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
