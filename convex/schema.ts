// Convex Library
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// Schema of the table
export default defineSchema({
	documents: defineTable({
		title: v.string(),
		userId: v.string(),
		isArchived: v.boolean(),
		isPublished: v.boolean(),
		parentDocument: v.optional(v.id('documents')),
		content: v.optional(v.string()),
		coverImage: v.optional(v.string()),
		icon: v.optional(v.string()),
	})
		// Query the currently logged in user
		.index('by_user', ['userId'])

		// Combination of userId and parentDocument. Will be used in sidebar
		.index('by_user_parent', ['userId', 'parentDocument']),
});
