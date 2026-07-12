INSERT INTO environmental_goals (title, department_id, target_co2, current_co2, deadline, status, created_by)
VALUES
('Reduce fleet emissions', 4, 5000.00, 1200.00, '2026-12-31', 'on_track', 1),
('Office energy reduction', 2, 2000.00, 800.00, '2026-09-30', 'active', 1);

INSERT INTO challenges (title, category, description, xp, difficulty, evidence_required, deadline, status, created_by)
VALUES
('Carpool Week', 'Transport', 'Encourage carpooling for a week', 50, 'easy', true, '2026-08-31', 'active', 1),
('Zero Waste Month', 'Waste', 'Reduce office waste for a month', 200, 'hard', true, '2026-11-30', 'active', 1);

INSERT INTO badges (name, description, unlock_rule, icon_path)
VALUES
('Fleet Saver', 'Awarded for reducing fleet emissions by 10 percent', JSON_OBJECT('type','goal_progress','goal_title','Reduce fleet emissions','threshold',10), 'icons/fleet_saver.png'),
('Zero Waster', 'Complete zero waste month challenge', JSON_OBJECT('type','challenge_complete','challenge_title','Zero Waste Month'), 'icons/zero_waster.png');

INSERT INTO rewards (name, description, points_required, stock, status)
VALUES
('Eco Mug', 'Reusable mug', 100, 20, 'active'),
('Extra Day Off', 'Half day off', 500, 5, 'active');
