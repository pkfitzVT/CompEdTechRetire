import os
from dotenv import load_dotenv
import requests

# Load from .env
load_dotenv()
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

REPO_OWNER = "pkfitzVT"
REPO_NAME = "CompEdTechRetire"


# Issue list
issues = [
    {
        "title": "Set up split-screen layout",
        "body": "Create a responsive layout with left and right panels.\n- [ ] Use Flexbox\n- [ ] Two containers: left-panel and right-panel\n- [ ] Ensure mobile responsiveness"
    },
    {
        "title": "Create PensionCalculator component",
        "body": "Build the left panel form for pension inputs.\n- [ ] Inputs: salary, raises%, pension%, service years, expenses\n- [ ] Controlled form\n- [ ] Display results below"
    },
    {
        "title": "Create NoPensionCalculator component",
        "body": "Right panel form for modeling salary without pension.\n- [ ] Inputs: expenses, growth%, inflation%, raises%\n- [ ] Controlled form\n- [ ] Trigger simulation"
    },
    {
        "title": "Project 15-year salary with raises",
        "body": "Implement salary projection function.\n- [ ] Write in utils/calculations.js\n- [ ] Include comments and console tests"
    },
    {
        "title": "Calculate top 3-year average for pension base",
        "body": "Sort and average the highest 3 years of salary.\n- [ ] Add averageTop3()\n- [ ] Verify output with test input"
    },
    {
        "title": "Calculate pension value",
        "body": "Use formula: pension = avgTop3 × (totalYearsOfService / 30)\n- [ ] Add to utils\n- [ ] Log result"
    },
    {
        "title": "Simulate 401k + after-tax investment growth",
        "body": "Split salary for retirement simulation.\n- [ ] 30K to 401k\n- [ ] Remainder taxed\n- [ ] Excess invested"
    },
    {
        "title": "Apply annual raise% and compound growth",
        "body": "Apply raises and growth each year.\n- [ ] Store in array\n- [ ] Display summary"
    },
    {
        "title": "Estimate taxes on income",
        "body": "Add estimateTax(income) function.\n- [ ] Use simplified brackets\n- [ ] Return after-tax income"
    },
    {
        "title": "Simulate retirement drawdown",
        "body": "Model 15-year drawdown at 4% growth.\n- [ ] Evenly distribute withdrawals\n- [ ] Display balances"
    },
    {
        "title": "Add debug mode to show intermediate values",
        "body": "Create toggle to show debug output.\n- [ ] Use console.table and logs"
    },
    {
        "title": "Add test data and validate functions",
        "body": "Use hardcoded data to verify calculations.\n- [ ] Build test harness\n- [ ] Manually validate outcomes"
    },
]

# GitHub API endpoint
url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues"
headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}

# Create issues
for issue in issues:
    response = requests.post(url, json=issue, headers=headers)
    if response.status_code == 201:
        print(f"✅ Created: {issue['title']}")
    else:
        print(f"❌ Failed: {issue['title']}")
        print(response.json())
