#!/bin/bash
# Script to fix dark mode colors across all components

# Fix bg-brand → bg-foreground
find components -name "*.tsx" -type f -exec sed -i '' 's/bg-brand[^/]/bg-foreground/g' {} +
find components -name "*.tsx" -type f -exec sed -i '' 's/bg-brand hover/bg-foreground hover/g' {} +

# Fix text-brand → text-foreground  
find components -name "*.tsx" -type f -exec sed -i '' 's/text-brand[^/]/text-foreground/g' {} +

# Fix bg-surface → bg-card (but not bg-surface-elevated)
find components -name "*.tsx" -type f -exec sed -i '' 's/bg-surface[^/]/bg-card/g' {} +

# Fix border-border → border-border/50 (but not border-border/50 itself)
find components -name "*.tsx" -type f -exec sed -i '' 's/border-border[^/]/border-border\/50/g' {} +

# Fix bg-brand/10 → bg-muted
find components -name "*.tsx" -type f -exec sed -i '' 's/bg-brand\/10/bg-muted/g' {} +

echo "Dark mode fixes applied!"

