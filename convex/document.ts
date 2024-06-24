// Convex Library
import { v } from 'convex/values';

// Convex Access to Database
import { title } from 'process';
import { Doc, Id } from './_generated/dataModel';
import { mutation, query } from './_generated/server';

// API for GET new documents 
export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    // If no logged in user then throw an error
    if(!identity) {
      throw new Error("Not Authenticated")
    }

    // Query all the documents
    const documents = await ctx.db.query("documents").collect()

    // Return all the documents
    return documents
  }
})


// Creating new data
export const create = mutation({
	args: {
		title: v.string(),
		parentDocument: v.optional(v.id('documents')),
	},
	handler: async (ctx, args) => {
		// Find the logged in user
		const identity = await ctx.auth.getUserIdentity();

		// If no logged in user then throw an error
		if (!identity) {
			throw new Error('Not Authenticated!');
		}

    // Grabbing the new data from the user
		const userId = identity.subject;

    // Creating new document
		const document = await ctx.db.insert('documents', {
			title: args.title,
			parentDocument: args.parentDocument,
			userId: userId,
			isArchived: false,
			isPublished: false,
		});
	},
});
