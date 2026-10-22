# Local-only script for checking the temporary `AI_TEST_CASE` hook.
# Do not keep this in production; remove the temp hook and unset `AI_TEST_CASE` before redeploy.

$ErrorActionPreference = 'Stop'

$FunctionUrl = $env:INTERVIEW_COACH_URL
$SupabaseAnonKey = $env:SUPABASE_ANON_KEY

if (-not $FunctionUrl) {
  throw 'Set INTERVIEW_COACH_URL before running this script.'
}

if (-not $SupabaseAnonKey) {
  throw 'Set SUPABASE_ANON_KEY before running this script.'
}

$Cases = @(
  'empty',
  'prose',
  'fenced',
  'truncated',
  'wrong_type',
  'out_of_range',
  'missing_fields',
  'no_lists',
  'injection_echo'
)

foreach ($Case in $Cases) {
  $Env:AI_TEST_CASE = $Case

  $Body = @{
    question = 'Tell me about a challenge and how you handled it.'
    answer = 'I responded quickly and learned from the situation.'
    category = 'behavioral'
  } | ConvertTo-Json -Compress

  $Headers = @{
    'Content-Type' = 'application/json'
    'Authorization' = "Bearer $SupabaseAnonKey"
  }

  Write-Host "Testing case: $Case"

  try {
    $Response = Invoke-RestMethod -Method Post -Uri $FunctionUrl -Headers $Headers -Body $Body
    $Response | ConvertTo-Json -Depth 20
  }
  catch {
    Write-Host "Request failed for $Case: $($_.Exception.Message)"
  }

  Write-Host '---'
}

Remove-Item Env:AI_TEST_CASE -ErrorAction SilentlyContinue
