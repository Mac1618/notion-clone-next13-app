// Convex Library
import { v } from 'convex/values';

// Convex Access to Database
import { Doc, Id } from './_generated/dataModel';
import { mutation, query } from './_generated/server';

export const getSidebar = query({
	args: {
		parentDocument: v.optional(v.id('documents')),
	},
	handler: async (ctx, args) => {
		// Get the loggedin user
		const identity = await ctx.auth.getUserIdentity();

		// Check the loggedin user
		if (!identity) {
			throw new Error('Not Authenticated');
		}

		// Grabbing the user id
		const userId = identity.subject;

		// Query
		const documents = await ctx.db
			// Table name to query
			.query('documents')
			// Index and the value of the document
			.withIndex('by_user_parent', (q) =>
				q //
					.eq('userId', userId)
					.eq('parentDocument', args.parentDocument)
			)
			// Filter based on isArchived is false
			.filter((q) => q.eq(q.field('isArchived'), false))
			// Arrange the value to descending order
			.order('desc')
			.collect();

		return documents;
	},
});

// Creating new documents
export const create = mutation({
	// Arguments to create new document
	args: {
		title: v.string(),
		parentDocument: v.optional(v.id('documents')),
	},

	// Handler to create new document
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

		return document;
	},
});

export const archive = mutation({
	args: {
		// Id of what we want to archive
		id: v.id('documents'),
	},
	handler: async (ctx, args) => {
		// Get the loggedin user
		const identity = await ctx.auth.getUserIdentity();

		// Check the loggedin user
		if (!identity) {
			throw new Error('Not Authenticated!');
		}

		// Grabbing the user id
		const userId = identity.subject;

		// Find if the documents exist
		const existingDocument = await ctx.db.get(args.id);

		// Throw error if document dont exist
		if (!existingDocument) {
			throw new Error('Not found!');
		}

		// Check if logged in userId is not equal to document creator userId
		if (existingDocument.userId !== userId) {
			throw new Error('Unauthorized access!');
		}

		// Recursive function to archive all children documents of the current documentId
		const recursiveArchive = async (documentId: Id<'documents'>) => {
			// Get the children documents of the current documentId
			const children = await ctx.db
				.query('documents')
				.withIndex('by_user_parent', (q) =>
					q //
						.eq('userId', userId)
						.eq('parentDocument', documentId)
				)
				.order('desc')
				.collect();

			// Loop all the children documents
			for (const child of children) {
				await ctx.db.patch(child._id, {
					isArchived: true,
				});

				// Rerun the entire function
				await recursiveArchive(child._id);
			}
		};

		// Update main parent document isArchived to true
		const document = await ctx.db.patch(args.id, {
			isArchived: true,
		});

		// Run the recursiveArchive loop for children documents
		recursiveArchive(args.id);

		return document;
	},
});

// GET all Archived Documents
export const getTrash = query({
	handler: async (ctx) => {
		// Get the loggedin user
		const identity = await ctx.auth.getUserIdentity();

		// Check the loggedin user
		if (!identity) {
			throw new Error('Not Authenticated!');
		}

		// Grabbing the user id
		const userId = identity.subject;

		// Get all the archived documents
		const archivedDocuments = await ctx.db
			.query('documents') // Table name to query
			// schema index
			.withIndex('by_user', (q) =>
				//	 index || new value
				q.eq('userId', userId)
			)
			// filter the documents to query
			.filter((q) =>
				//				table field		|| value
				q.eq(q.field('isArchived'), true)
			)
			.order('desc')
			.collect();

		return archivedDocuments;
	},
});

// Restore a document from Trash
export const restoreDocument = mutation({
	args: { id: v.id('documents') },
	handler: async (ctx, args) => {
		// Get the logged-in user
		const identity = await ctx.auth.getUserIdentity();

		// Check if the user is authenticated
		if (!identity) {
			throw new Error('Not Authenticated!');
		}

		// Grab the user ID
		const userId = identity.subject;

		// Retrieve the existing document from the database using the provided ID
		const existingDocument = await ctx.db.get(args.id);

		// Check if the document exists
		if (!existingDocument) {
			throw new Error('Not found!');
		}

		// Check if the document belongs to the logged-in user
		if (existingDocument.userId !== userId) {
			throw new Error('Unauthorized access!');
		}

		// Function to recursively restore child documents
		const recursiveRestore = async (documentId: Id<'documents'>) => {
			// Get all child documents
			const children = await ctx.db
				.query('documents')
				.withIndex('by_user_parent', (q) =>
					q //
						.eq('userId', userId)
						.eq('parentDocument', documentId)
				)
				.collect();

			// Iterate over each child document and restore it
			for (const child of children) {
				await ctx.db.patch(child._id, {
					isArchived: false,
				});

				// Recursively restore the child documents
				await recursiveRestore(child._id);
			}
		};

		// Prepare the options to update the document
		const options: Partial<Doc<'documents'>> = {
			isArchived: false,
		};

		// Check if the document has a parent document
		if (existingDocument.parentDocument) {
			// Retrieve the parent document
			const parent = await ctx.db.get(existingDocument.parentDocument);

			// Additional logic could be added here if needed
			if (parent?.parentDocument) {
				// Placeholder for any potential future logic
			}
		}

		// Update the document in the database
		const document = await ctx.db.patch(args.id, options);

		// Recursively restore the document and its children
		recursiveRestore(args.id);

		// Return the existing document
		return document;
	},
});

// Delete a document permanently from the database
export const removeDocument = mutation({
	args: { id: v.id('documents') },
	handler: async (ctx, args) => {
		// Get the logged-in user
		const identity = await ctx.auth.getUserIdentity();

		// Check if the user is authenticated
		if (!identity) {
			throw new Error('Not Authenticated!');
		}

		// Grab the user ID
		const userId = identity.subject;

		// Retrieve the existing document from the database using the provided ID
		const existingDocument = await ctx.db.get(args.id);

		// Check if the document exists
		if (!existingDocument) {
			throw new Error('Not found!');
		}

		// Check if the document belongs to the logged-in user
		if (existingDocument.userId !== userId) {
			throw new Error('Unauthorized Access!');
		}

		// Delete the document from the database
		const document = await ctx.db.delete(args.id);

		// Return the deleted document
		return document;
	},
});
