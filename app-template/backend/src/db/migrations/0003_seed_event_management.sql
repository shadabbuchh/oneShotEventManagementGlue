-- Custom SQL migration file for event management seed data --

-- Insert 50 events with varied statuses and dates
WITH event_names AS (
  SELECT name, row_number() OVER () AS rn
  FROM (
    VALUES
      ('Tech Summit 2025'),
      ('Annual Developer Conference'),
      ('Product Launch Event'),
      ('Customer Success Meetup'),
      ('Q1 Sales Kickoff'),
      ('Innovation Workshop'),
      ('Digital Marketing Summit'),
      ('AI & Machine Learning Expo'),
      ('Cybersecurity Conference'),
      ('Cloud Computing Symposium'),
      ('Data Analytics Forum'),
      ('Mobile Dev Conference'),
      ('Frontend Masters Workshop'),
      ('Backend Engineering Summit'),
      ('DevOps Days'),
      ('Agile Transformation Meetup'),
      ('Design Thinking Workshop'),
      ('UX/UI Conference'),
      ('Startup Pitch Night'),
      ('Investor Relations Meeting'),
      ('Team Building Retreat'),
      ('Leadership Summit'),
      ('Women in Tech Conference'),
      ('Diversity & Inclusion Forum'),
      ('Open Source Contributors Meetup'),
      ('Blockchain Summit'),
      ('IoT Innovation Lab'),
      ('Quantum Computing Workshop'),
      ('AR/VR Experience Day'),
      ('Gaming Industry Expo'),
      ('FinTech Forum'),
      ('HealthTech Conference'),
      ('EdTech Innovation Day'),
      ('E-commerce Summit'),
      ('Social Media Marketing Workshop'),
      ('Content Creation Masterclass'),
      ('SEO & SEM Conference'),
      ('Customer Experience Summit'),
      ('Supply Chain Innovation Forum'),
      ('Sustainability Conference'),
      ('Green Tech Expo'),
      ('Smart Cities Symposium'),
      ('Industry 4.0 Workshop'),
      ('Digital Transformation Summit'),
      ('API Development Workshop'),
      ('Microservices Architecture Conf'),
      ('Security Best Practices Training'),
      ('Compliance & Governance Meeting'),
      ('Project Management Certification'),
      ('Annual Company Picnic')
  ) AS v(name)
  LIMIT 50
),
inserted_events AS (
  INSERT INTO events (
    id, name, slug, start_date, end_date, venue_name, address,
    description, capacity, status, visibility, registration_status,
    created_at, updated_at
  )
  SELECT
    gen_random_uuid() AS id,
    e.name,
    lower(replace(e.name, ' ', '-')) || '-' || substr(md5(random()::text), 1, 6) AS slug,
    NOW() + (random() * interval '180 days' - interval '30 days') AS start_date,
    NOW() + (random() * interval '180 days' - interval '30 days') + interval '1 day' + (random() * interval '2 days') AS end_date,
    CASE (random() * 10)::int
      WHEN 0 THEN 'Grand Hyatt Conference Center'
      WHEN 1 THEN 'Tech Hub Auditorium'
      WHEN 2 THEN 'Innovation Center Main Hall'
      WHEN 3 THEN 'Downtown Convention Center'
      WHEN 4 THEN 'University Campus Arena'
      WHEN 5 THEN 'Business Park Conference Room'
      WHEN 6 THEN 'Startup Incubator Space'
      WHEN 7 THEN 'Corporate Headquarters'
      WHEN 8 THEN 'Virtual Event Platform'
      ELSE 'City Convention Hall'
    END AS venue_name,
    CASE (random() * 10)::int
      WHEN 0 THEN '123 Main Street, San Francisco, CA 94102'
      WHEN 1 THEN '456 Tech Avenue, Austin, TX 78701'
      WHEN 2 THEN '789 Innovation Drive, Seattle, WA 98101'
      WHEN 3 THEN '321 Business Blvd, New York, NY 10001'
      WHEN 4 THEN '654 University Way, Boston, MA 02134'
      WHEN 5 THEN '987 Corporate Lane, Chicago, IL 60601'
      WHEN 6 THEN '246 Startup Street, Denver, CO 80202'
      WHEN 7 THEN '135 Enterprise Road, Atlanta, GA 30303'
      WHEN 8 THEN 'Online - Virtual Event'
      ELSE '579 Conference Center Drive, Miami, FL 33101'
    END AS address,
    'Join us for an exciting ' || e.name || '. This event brings together industry leaders, innovators, and professionals to share knowledge, network, and explore the latest trends and technologies.' AS description,
    CASE
      WHEN random() < 0.2 THEN NULL
      ELSE (50 + (random() * 450)::int)
    END AS capacity,
    CASE
      WHEN e.rn <= 5 THEN 'draft'::event_status
      WHEN e.rn <= 20 THEN 'published'::event_status
      WHEN e.rn <= 35 THEN 'closed'::event_status
      WHEN e.rn <= 45 THEN 'published'::event_status
      ELSE 'archived'::event_status
    END AS status,
    CASE
      WHEN random() < 0.8 THEN 'public'::event_visibility
      ELSE 'private'::event_visibility
    END AS visibility,
    CASE
      WHEN e.rn <= 5 THEN 'closed'::registration_status
      WHEN e.rn <= 20 THEN 'open'::registration_status
      WHEN e.rn <= 35 THEN 'closed'::registration_status
      WHEN e.rn <= 45 THEN 'open'::registration_status
      ELSE 'closed'::registration_status
    END AS registration_status,
    NOW() - (random() * interval '90 days') AS created_at,
    NOW() - (random() * interval '30 days') AS updated_at
  FROM event_names e
  RETURNING id, name
)
-- Store event IDs in a temp table for foreign key references
SELECT * INTO TEMP TABLE temp_events FROM inserted_events;

-- Insert sessions for events (2-5 sessions per event)
WITH session_titles AS (
  SELECT title, speaker
  FROM (
    VALUES
      ('Opening Keynote', 'Dr. Sarah Johnson'),
      ('Future of Technology', 'Michael Chen'),
      ('Innovation in Practice', 'Emily Rodriguez'),
      ('Leadership Strategies', 'David Thompson'),
      ('Building Scalable Systems', 'Jennifer Lee'),
      ('Customer Success Stories', 'Robert Martinez'),
      ('Panel Discussion: Industry Trends', 'Various Speakers'),
      ('Workshop: Hands-on Learning', 'Amanda Wilson'),
      ('Networking Break', NULL),
      ('Product Demo', 'Technical Team'),
      ('Best Practices Roundtable', 'Expert Panel'),
      ('Case Study Presentation', 'Client Representatives'),
      ('Q&A Session', 'All Speakers'),
      ('Closing Remarks', 'Event Organizers'),
      ('Technical Deep Dive', 'Engineering Team'),
      ('Business Strategy Session', 'Executive Leadership'),
      ('Innovation Showcase', 'Startup Founders'),
      ('Research Findings', 'Academic Partners'),
      ('Implementation Guide', 'Solutions Architects'),
      ('Success Metrics Review', 'Analytics Team')
  ) AS v(title, speaker)
)
INSERT INTO sessions (
  id, event_id, title, speaker, start_time, end_time, room, created_at, updated_at
)
SELECT
  gen_random_uuid() AS id,
  e.id AS event_id,
  st.title,
  st.speaker,
  (SELECT start_date FROM events WHERE id = e.id) + (interval '9 hours') + (s.session_num * interval '90 minutes') AS start_time,
  (SELECT start_date FROM events WHERE id = e.id) + (interval '9 hours') + (s.session_num * interval '90 minutes') + interval '60 minutes' AS end_time,
  CASE (random() * 5)::int
    WHEN 0 THEN 'Main Hall'
    WHEN 1 THEN 'Room A'
    WHEN 2 THEN 'Room B'
    WHEN 3 THEN 'Workshop Space'
    ELSE 'Conference Room 1'
  END AS room,
  NOW() - (random() * interval '60 days') AS created_at,
  NOW() - (random() * interval '20 days') AS updated_at
FROM temp_events e
CROSS JOIN LATERAL (
  SELECT generate_series AS session_num
  FROM generate_series(0, 2 + (random() * 2)::int)
) s
CROSS JOIN LATERAL (
  SELECT title, speaker
  FROM session_titles
  ORDER BY random()
  LIMIT 1
) st;

-- Insert attendees for published and closed events
WITH attendee_data AS (
  SELECT
    first_name || ' ' || last_name AS name,
    lower(first_name) || '.' || lower(last_name) || '@' || domain AS email
  FROM (
    VALUES
      ('James', 'Anderson', 'email.com'),
      ('Mary', 'Brown', 'gmail.com'),
      ('Robert', 'Davis', 'yahoo.com'),
      ('Patricia', 'Garcia', 'outlook.com'),
      ('John', 'Johnson', 'company.com'),
      ('Jennifer', 'Jones', 'email.com'),
      ('Michael', 'Miller', 'gmail.com'),
      ('Linda', 'Martinez', 'yahoo.com'),
      ('William', 'Rodriguez', 'outlook.com'),
      ('Elizabeth', 'Smith', 'company.com'),
      ('David', 'Taylor', 'email.com'),
      ('Barbara', 'Thomas', 'gmail.com'),
      ('Richard', 'White', 'yahoo.com'),
      ('Susan', 'Wilson', 'outlook.com'),
      ('Joseph', 'Moore', 'company.com'),
      ('Jessica', 'Martin', 'email.com'),
      ('Thomas', 'Jackson', 'gmail.com'),
      ('Sarah', 'Lee', 'yahoo.com'),
      ('Charles', 'Lewis', 'outlook.com'),
      ('Karen', 'Walker', 'company.com'),
      ('Christopher', 'Hall', 'email.com'),
      ('Nancy', 'Allen', 'gmail.com'),
      ('Daniel', 'Young', 'yahoo.com'),
      ('Lisa', 'King', 'outlook.com'),
      ('Matthew', 'Wright', 'company.com'),
      ('Betty', 'Lopez', 'email.com'),
      ('Mark', 'Hill', 'gmail.com'),
      ('Dorothy', 'Scott', 'yahoo.com'),
      ('Donald', 'Green', 'outlook.com'),
      ('Sandra', 'Adams', 'company.com'),
      ('Paul', 'Baker', 'email.com'),
      ('Ashley', 'Nelson', 'gmail.com'),
      ('Steven', 'Carter', 'yahoo.com'),
      ('Kimberly', 'Mitchell', 'outlook.com'),
      ('Andrew', 'Roberts', 'company.com'),
      ('Emily', 'Turner', 'email.com'),
      ('Joshua', 'Phillips', 'gmail.com'),
      ('Donna', 'Campbell', 'yahoo.com'),
      ('Kenneth', 'Parker', 'outlook.com'),
      ('Michelle', 'Evans', 'company.com'),
      ('Kevin', 'Edwards', 'email.com'),
      ('Carol', 'Collins', 'gmail.com'),
      ('Brian', 'Stewart', 'yahoo.com'),
      ('Amanda', 'Sanchez', 'outlook.com'),
      ('George', 'Morris', 'company.com'),
      ('Melissa', 'Rogers', 'email.com'),
      ('Edward', 'Reed', 'gmail.com'),
      ('Deborah', 'Cook', 'yahoo.com'),
      ('Ronald', 'Morgan', 'outlook.com'),
      ('Stephanie', 'Bell', 'company.com')
  ) AS v(first_name, last_name, domain)
)
INSERT INTO attendees (
  id, event_id, name, email, ticket_type, status, notes,
  reference_number, checked_in_at, created_at, updated_at
)
SELECT DISTINCT ON (event_id, email)
  gen_random_uuid() AS id,
  e.id AS event_id,
  ad.name,
  ad.email,
  CASE (random() * 4)::int
    WHEN 0 THEN 'General Admission'
    WHEN 1 THEN 'VIP'
    WHEN 2 THEN 'Student'
    ELSE 'Early Bird'
  END AS ticket_type,
  CASE
    WHEN random() < 0.7 THEN 'registered'::attendee_status
    WHEN random() < 0.9 THEN 'checked_in'::attendee_status
    ELSE 'canceled'::attendee_status
  END AS status,
  CASE
    WHEN random() < 0.1 THEN 'Special dietary requirements: Vegetarian'
    WHEN random() < 0.15 THEN 'Requires wheelchair access'
    WHEN random() < 0.2 THEN 'First time attendee'
    ELSE NULL
  END AS notes,
  'REF-' || substr(md5(random()::text), 1, 8) AS reference_number,
  CASE
    WHEN random() < 0.3 THEN (SELECT start_date FROM events WHERE id = e.id) + (random() * interval '2 hours')
    ELSE NULL
  END AS checked_in_at,
  NOW() - (random() * interval '60 days') AS created_at,
  NOW() - (random() * interval '20 days') AS updated_at
FROM temp_events e
CROSS JOIN LATERAL (
  SELECT * FROM attendee_data
  ORDER BY random()
  LIMIT CASE
    WHEN e.name LIKE '%Summit%' OR e.name LIKE '%Conference%' THEN 15 + (random() * 35)::int
    ELSE 5 + (random() * 20)::int
  END
) ad
WHERE EXISTS (
  SELECT 1 FROM events
  WHERE id = e.id
  AND status IN ('published', 'closed')
);

-- Clean up temp table
DROP TABLE temp_events;