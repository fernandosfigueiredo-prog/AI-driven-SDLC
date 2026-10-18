import sys
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from validate_sdlc import validate, frontmatter, SKILLS

class FrameworkContractTests(unittest.TestCase):
    def test_structure_and_contracts(self):
        self.assertEqual([], validate(ROOT))

    def test_discovery_is_main_chat(self):
        text = (ROOT / "skills/discover/SKILL.md").read_text(encoding="utf-8").lower()
        self.assertIn("conversa principal", text)
        self.assertIn("aguarde resposta", text)

    def test_initiative_review_read_only(self):
        text = (ROOT / "skills/initiative-review/SKILL.md").read_text(encoding="utf-8").lower()
        self.assertIn("somente leitura", text)
        self.assertIn("não modificar", text)

    def test_buddy_is_not_assumed_main_agent(self):
        text = (ROOT / "docs/USAGE.md").read_text(encoding="utf-8").lower()
        self.assertIn("não altera obrigatoriamente o modelo", text)
        self.assertIn("/ai-driven-sdlc:buddy", text)

    def test_skill_headers(self):
        for skill in SKILLS:
            metadata, issues = frontmatter(ROOT / "skills" / skill / "SKILL.md")
            self.assertEqual([], issues)
            self.assertEqual(skill, metadata.get("name"))

if __name__ == "__main__":
    unittest.main()
