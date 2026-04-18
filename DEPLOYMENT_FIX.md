# Deployment Pipeline Fix Summary

## Problem

The deployment pipeline was failing with the error "Not all required workflows have passed" when attempting to deploy to GitHub Pages. This occurred in workflow run #20 when trying to deploy commit `cfadcff` to main.

## Root Cause

The deployment workflow (`deploy.yml`) uses a `workflow_run` trigger that fires when either the "Test & Visual Regression" or "CodeQL Advanced" workflows complete. The verification step checks that BOTH workflows have succeeded before allowing deployment.

The issue was that the verification logic was checking ALL workflow runs for a commit, including cancelled ones. The test workflow has this concurrency configuration:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

When multiple commits are pushed quickly to the same branch, previous workflow runs are cancelled. The deployment verification was seeing these cancelled runs and failing because it couldn't find successful completions for all required workflows.

## Solution

Updated the workflow verification logic in `.github/workflows/deploy.yml` to:

1. **Skip cancelled runs**: Only consider workflow runs with `status === 'completed'` AND `conclusion !== 'cancelled'`
2. **Find the most recent valid run**: For each required workflow, find the first (most recent) non-cancelled run
3. **Better error messages**: Show which specific workflows are missing or failed, along with their conclusion status
4. **Enhanced logging**: Log commit SHA, required workflows list, and workflow statuses for easier debugging

### Code Changes

```javascript
// Before: Checked all runs, including cancelled
for (const run of runs.workflow_runs) {
  if (requiredWorkflows.includes(run.name)) {
    workflowStatuses[run.name] = run.conclusion;
  }
}

// After: Skip cancelled runs, find most recent valid run
for (const run of runs.workflow_runs) {
  if (requiredWorkflows.includes(run.name)) {
    if (run.status === 'completed' && run.conclusion !== 'cancelled') {
      if (!(run.name in workflowStatuses)) {
        workflowStatuses[run.name] = run.conclusion;
      }
    }
  }
}
```

## Testing

The fix will be validated by:

1. Pushing commits to main to trigger the deployment workflow
2. Verifying that the workflow correctly ignores cancelled runs
3. Confirming that deployment succeeds when both required workflows complete successfully
4. Checking that appropriate error messages appear if workflows fail

## Expected Behavior

After this fix:

- ✅ Cancelled workflow runs are ignored
- ✅ Deployment proceeds when the most recent non-cancelled runs of both required workflows succeed
- ✅ Clear error messages show which workflows are missing or failed
- ✅ Deployment logs show commit SHA and workflow statuses for debugging

## Related Files

- `.github/workflows/deploy.yml` - Deployment workflow (fixed)
- `.github/workflows/test.yml` - Test workflow (has cancel-in-progress setting)
- `.github/workflows/codeql.yml` - CodeQL security scanning workflow
