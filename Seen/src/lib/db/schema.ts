import { integer, pgTable, text, timestamp, uuid, pgEnum, primaryKey } from 'drizzle-orm/pg-core';

// Define the enum type for status
export const statusEnum = pgEnum('intent', ['romantic', 'core', 'archive', 'new', 'invest', 'associate']);

export const people = pgTable('people', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  zip: integer('zip'),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  body: text('body'),
  intent: statusEnum().notNull().default('new') // Add status field with default value 'new'
});

// Define the associations table
export const associations = pgTable('associations', {
  primary_id: uuid('primary_id').notNull().references(() => people.id),
  associate_id: uuid('associate_id').notNull().references(() => people.id),
  created_at: timestamp('created_at').notNull().defaultNow(),
}, (table) => {
  return [
    primaryKey({ columns: [table.primary_id, table.associate_id] })
  ];
}
);
