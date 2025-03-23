#!/usr/bin/env node

/**
 * Run elizabot-2025 tests
 * This script runs the tests and provides better error reporting
 */

console.log("Running elizabot-2025.js tests...\n");

try {
  // Attempt to run the tests
  require('./elizabot-2025.test.js');
} catch (error) {
  console.error("\n❌ Test execution failed with error:");
  console.error(error);

  // Provide more helpful error messages based on common issues
  if (error.code === 'MODULE_NOT_FOUND') {
    console.log("\nThis error typically means one of the data files could not be found.");
    console.log("Make sure all the following files exist in the data/ directory:");
    console.log("  - eliza-initials.js");
    console.log("  - eliza-finals.js");
    console.log("  - eliza-quits.js");
    console.log("  - eliza-pres.js");
    console.log("  - eliza-posts.js");
    console.log("  - eliza-synons.js");
    console.log("  - eliza-keywords.js");
    console.log("  - eliza-post-transforms.js");
  } else if (error.message.includes('undefined')) {
    console.log("\nThis error typically means one of the data objects wasn't properly loaded.");
    console.log("Make sure all data files export their variables correctly.");
  }

  process.exit(1);
}

console.log("\nTest execution complete.");