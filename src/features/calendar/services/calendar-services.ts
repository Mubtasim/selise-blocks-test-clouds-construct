import { CalendarEventColor, MEMBER_STATUS } from '../enums/calendar.enum';
import { CalendarEvent } from '../types/calendar-event.types';

export const myEventsList: CalendarEvent[] = [
  {
    eventId: 'HkRIfPrJHe',
    title: 'Team Standup Meeting',
    start: '2025-04-01T09:00:00.000Z' as unknown as Date,
    end: '2025-04-01T09:30:00.000Z' as unknown as Date,
    color: CalendarEventColor.PRIMARY,
    description: `Daily sync-up to share progress, blockers, and plans for the day. Each team member provides a quick update to ensure alignment and collaboration.`,
    resource: {
      members: [
        {
          id: 'A1B2C3D4',
          name: 'Adrian Müller',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'E5F6G7H8',
          name: 'Blocks Smith',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'I9J0K1L2',
          name: 'Charlie Brown',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'M3N4O5P6',
          name: 'Dana White',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'Q7R8S9T0',
          name: 'Eve Adams',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.NORESPONSE,
        },
      ],
    },
  },
  {
    title: 'Client Presentation',
    eventId: 'HogihwbMpu',
    start: '2025-04-02T14:00:00.000Z' as unknown as Date,
    end: '2025-04-02T15:30:00.000Z' as unknown as Date,
    description: `Present the Q2 marketing strategy to the client. The presentation will include an overview of the target audience, key performance indicators (KPIs), and projected outcomes. Additionally, we will discuss potential risks and mitigation strategies to ensure alignment with the client’s expectations.`,
    color: CalendarEventColor.SECONDARY100,
    resource: {
      members: [
        {
          id: 'U1V2W3X4',
          name: 'Frank Lee',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'Y5Z6A7B8',
          name: 'Grace Kim',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'C9D0E1F2',
          name: 'Henry Wong',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'G3H4I5J6',
          name: 'Investor A',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'K7L8M9N0',
          name: 'Eve Adams',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.NORESPONSE,
        },
      ],
    },
  },
  {
    title: 'Client and Team Discussion',
    eventId: 'x932o6lhgv',
    start: '2025-04-02T16:00:00.000Z' as unknown as Date,
    end: '2025-04-02T17:30:00.000Z' as unknown as Date,
    description: `Discuss the progress of the marketing strategy with the team and client. The meeting will include updates on tasks, timelines, and any issues that need to be addressed to ensure smooth execution.`,
    color: CalendarEventColor.DEEPPURPLE,
    resource: {
      members: [
        {
          id: 'U1IHJEL9',
          name: 'Jet Lee',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'Y5ZI30WT',
          name: 'Johanas Kim',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.DECLINED,
        },
      ],
    },
  },
  {
    eventId: 'x932o6lhgv',
    title: 'Project Deadline',
    start: '2025-04-05T23:59:00.000Z' as unknown as Date,
    end: '2025-04-06T00:00:00.000Z' as unknown as Date,
    color: CalendarEventColor.SECONDARY,
    description: `Final due date for project deliverables. All tasks and documentation should be completed and submitted by end of day.`,
    resource: {
      members: [
        {
          id: 'O1P2Q3R4',
          name: 'Sangay',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'S5T6U7V8',
          name: 'Preety',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: '32r1yoQyUE',
    title: 'Lunch with Client',
    start: '2025-04-10T12:30:00.000Z' as unknown as Date,
    end: '2025-04-10T14:00:00.000Z' as unknown as Date,
    description: `Discuss potential partnership opportunities over lunch. This informal meeting will allow us to explore synergies between our organizations and identify areas for collaboration. We will also address any concerns the client may have and outline next steps for moving forward.`,
    color: CalendarEventColor.DEEPPURPLE,
    resource: {
      members: [
        {
          id: 'W9X0Y1Z2',
          name: 'Lakit',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'A3B4C5D6',
          name: 'Nahian',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'E7F8G9H0',
          name: 'Grace Kim',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: '5AfjKxgcJe',
    title: 'Marketing Strategy Meeting',
    start: '2025-04-12T11:00:00.000Z' as unknown as Date,
    end: '2025-04-12T12:30:00.000Z' as unknown as Date,
    color: CalendarEventColor.BURGUNDY,
    description: `Discussion on upcoming marketing initiatives, target audience segmentation, content planning, and campaign strategy alignment.`,
    resource: {
      members: [
        {
          id: 'I1J2K3L4',
          name: 'Imon Hasian',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'M5N6O7P8',
          name: 'Yurriegam',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'Q9R0S1T2',
          name: 'Jamyang Lethro',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'CJVV5yFSla',
    title: 'Conference Call with Investors',
    start: '2025-04-14T16:00:00.000Z' as unknown as Date,
    end: '2025-04-14T17:00:00.000Z' as unknown as Date,
    description: `Provide an update on the company’s financial performance and growth strategy. The call will cover key metrics such as revenue growth, market share, and operational efficiency. We will also discuss upcoming initiatives and how they align with our long-term vision. Investors will have the opportunity to ask questions and provide feedback.`,
    color: CalendarEventColor.WARNING,
    resource: {
      members: [
        {
          id: 'U3V4W5X6',
          name: 'Alex',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'Y7Z8A9B0',
          name: 'Priya',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'C1D2E3F4',
          name: 'Namgay Tobden',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'G5H6I7J8',
          name: 'Alexander',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'K9L0M1N2',
          name: 'Thinley Dhendup',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'O3P4Q5R6',
          name: 'Karan Mohasian',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.DECLINED,
        },
        {
          id: 'S7T8U9V0',
          name: 'Michel Jackson',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.NORESPONSE,
        },
      ],
    },
  },
  {
    eventId: 'iVOBs4I2PM',
    title: 'Quarterly Business Review',
    start: '2025-04-15T10:00:00.000Z' as unknown as Date,
    end: '2025-04-15T12:00:00.000Z' as unknown as Date,
    description: `Quarterly meeting to analyze business performance, evaluate goals, and align on upcoming priorities and initiatives.`,
    color: CalendarEventColor.BURGUNDY100,
    resource: {
      members: [
        {
          id: 'C3D4E5F6',
          name: 'Yangchen',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'G7H8I9J0',
          name: 'Jigme Dorji',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'K1L2M3N4',
          name: 'Youniko',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'O5P6Q7R8',
          name: 'Palman Gallay',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'S9T0U1V2',
          name: 'John Doe',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.DECLINED,
        },
        {
          id: 'W3X4Y5Z6',
          name: 'Lalit',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.DECLINED,
        },
        {
          id: 'A7B8C9D0',
          name: 'Kuenzang Choeden',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.NORESPONSE,
        },
      ],
    },
  },
  {
    eventId: '4pcb2OBTar',
    title: 'Team Outing',
    start: '2025-04-20T15:00:00.000Z' as unknown as Date,
    end: '2025-04-20T18:00:00.000Z' as unknown as Date,
    description: `Annual team outing to celebrate recent achievements and foster team bonding. This event will include a variety of activities such as team-building exercises, games, and a group dinner. It is an excellent opportunity for employees to relax, connect with colleagues, and recharge before the next quarter.`,
    color: CalendarEventColor.PRIMARY100,
    resource: {
      members: [
        {
          id: 'W1X2Y3Z4',
          name: 'Thinley Wangchuk',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'A5B6C7D8',
          name: 'Tashi Drakpa',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'E9F0G1H2',
          name: 'Sangay Yonten',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'I3J4K5L6',
          name: 'Levi',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'M7N8O9P0',
          name: 'John Doe',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'Q1R2S3T4',
          name: 'Lethro',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'U5V6W7X8',
          name: 'Pema Dema',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'Zy7gvMBKtx',
    title: 'Webinar on Tech Trends',
    start: '2025-04-22T18:00:00.000Z' as unknown as Date,
    end: '2025-04-22T19:30:00.000Z' as unknown as Date,
    description: `Join us for a live webinar exploring the latest technology trends, innovations, and their impact on the industry.`,
    color: CalendarEventColor.SECONDARY100,
    resource: {
      members: [
        {
          id: 'A1B2C3D4',
          name: 'Tashi Dorji',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'E5F6G7H8',
          name: 'Sonam Choden',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'I9J0K1L2',
          name: 'Karma Wangdi',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.DECLINED,
        },
        {
          id: 'M3N4O5P6',
          name: 'Pema Dema',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.NORESPONSE,
        },
        {
          id: 'Q7R8S9T0',
          name: 'Jigme Norbu',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'bYeXo8lK3f',
    title: 'HR Training Session',
    start: '2025-04-24T09:30:00.000Z' as unknown as Date,
    end: '2025-04-24T11:00:00.000Z' as unknown as Date,
    color: CalendarEventColor.DEEPPURPLE100,
    description: `The HR Training Session is designed to provide HR professionals with a comprehensive understanding of key human resource practices, including recruitment, performance management, employee engagement, and legal compliance. This session covers the essential roles of HR, offering practical insights into talent acquisition, employee development, and compensation strategies. Participants will also explore the importance of fostering an inclusive workplace, managing employee relations, and handling conflict resolution effectively. Through interactive activities and real-world case studies, this training equips HR practitioners with the skills to create a positive, productive work environment while ensuring compliance with labor laws. By the end of the session, attendees will be better prepared to manage the diverse challenges within modern HR roles.`,
    resource: {
      members: [
        {
          id: 'X1Y2Z3A4',
          name: 'Lhamo Tenzin',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'B5C6D7E8',
          name: 'Jigme Lhamo',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.NORESPONSE,
        },
        {
          id: 'F9G0H1I2',
          name: 'Tenzin Phuntsho',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.DECLINED,
        },
        {
          id: 'J3K4L5M6',
          name: 'Choden Dema',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.NORESPONSE,
        },
        {
          id: 'N7O8P9Q0',
          name: 'Sonam Tenzin',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'OkpWpdwHxw',
    title: 'Company Townhall Meeting',
    start: '2025-04-25T13:00:00.000Z' as unknown as Date,
    end: '2025-04-25T14:30:00.000Z' as unknown as Date,
    description: `Quarterly townhall meeting to discuss company updates, achievements, and future plans. The agenda includes a review of the company’s performance over the past quarter, recognition of outstanding contributions, and an overview of upcoming projects. Employees are encouraged to participate actively by asking questions and sharing their thoughts.`,
    color: CalendarEventColor.BURGUNDY100,
    resource: {
      members: [
        {
          id: 'E1F2G3H4',
          name: 'Mani Kumar',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'I5J6K7L8',
          name: 'Suraj',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'yNazNhKamN',
    title: 'Board Meeting',
    start: '2025-04-28T15:00:00.000Z' as unknown as Date,
    end: '2025-04-28T17:00:00.000Z' as unknown as Date,
    color: CalendarEventColor.DEEPPURPLE,
    description: `The Board Meeting is a strategic gathering designed for the organization’s senior leadership and board members to discuss key company decisions, evaluate performance, and plan future goals. During the meeting, executives will present updates on financial performance, operations, and market trends, followed by discussions on critical initiatives, risk management, and growth opportunities. Board members will review governance practices, ensure compliance with regulations, and provide guidance on organizational direction. Key decisions regarding budgeting, investments, and high-level business strategies will be made, and various committees may provide updates on their areas of focus. This meeting serves as a platform for collaboration among top decision-makers to shape the company's vision and long-term objectives.`,
    resource: {
      members: [
        {
          id: 'A12B34C56',
          name: 'Dorji Wangchuk',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'D78E90F12',
          name: 'Tashi Dema',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'G34H56I78',
          name: 'Sonam Jamtsho',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.DECLINED,
        },
        {
          id: 'K90L12M34',
          name: 'Choden Wangmo',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.NORESPONSE,
        },
        {
          id: 'N56O78P90',
          name: 'Pema Tshering',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'Q12R34S56',
          name: 'Karma Choden',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.NORESPONSE,
        },
        {
          id: 'T78U90V12',
          name: 'Jigme Dorji',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.DECLINED,
        },
        {
          id: 'W34X56Y78',
          name: 'Tenzin Phuntsho',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: '3jhtvUlx3v',
    title: 'Product Launch Event',
    start: '2025-05-01T10:00:00.000Z' as unknown as Date,
    end: '2025-05-01T12:00:00.000Z' as unknown as Date,
    description: `Official launch of the new product line. This event will feature presentations from the product development team, live demonstrations, and a Q&A session with key stakeholders. Media representatives and industry influencers have been invited to amplify the reach of the launch. Attendees will also have the opportunity to network and provide feedback.`,
    color: CalendarEventColor.PRIMARY100,
    resource: {
      members: [
        {
          id: 'M1N2O3P4',
          name: 'Rajiv',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'Q5R6S7T8',
          name: 'Dhanbir Singh',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'cUXEt4WJCR',
    title: 'Team Brainstorming Session',
    start: '2025-05-03T14:30:00.000Z' as unknown as Date,
    end: '2025-05-03T16:00:00.000Z' as unknown as Date,
    description: `A collaborative brainstorming session to generate innovative ideas for upcoming projects. The session will focus on identifying key challenges, proposing creative solutions, and prioritizing actionable tasks. Participants are encouraged to bring their insights and actively contribute to the discussion.`,
    color: CalendarEventColor.WARNING,
    resource: {
      members: [
        {
          id: 'B1C2D3E4',
          name: 'Alex Johnson',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'F5G6H7I8',
          name: 'Sophia Lee',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'Dv8wHl4t64',
    title: 'Coding Hackathon',
    start: '2025-05-07T08:00:00.000Z' as unknown as Date,
    end: '2025-05-07T20:00:00.000Z' as unknown as Date,
    description: `24-hour coding hackathon to innovate and develop new features for upcoming projects. Participants will work in teams to brainstorm ideas, design prototypes, and present their solutions. Mentors and judges will be available to provide guidance and evaluate submissions. Prizes will be awarded to the top-performing teams.`,
    color: CalendarEventColor.PRIMARY,
    resource: {
      members: [
        {
          id: 'U1V2W3X4',
          name: 'Jigme Loday',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'Y5Z6A7B8',
          name: 'Dorji',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'Z1kqXGGVBm',
    title: 'Financial Planning Meeting',
    start: '2025-05-10T11:00:00.000Z' as unknown as Date,
    end: '2025-05-10T12:30:00.000Z' as unknown as Date,
    description: `A strategic meeting to review the company’s financial performance and plan for future growth. Key topics include budget allocation, revenue forecasts, and cost optimization strategies. The session will also address potential risks and opportunities to ensure financial stability and long-term success.`,
    color: CalendarEventColor.PRIMARY100,
    resource: {
      members: [
        {
          id: 'J9K0L1M2',
          name: 'Michael Brown',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'N3O4P5Q6',
          name: 'Emily Davis',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'ruyHjXRR3A',
    title: 'Customer Feedback Session',
    start: '2025-05-12T15:00:00.000Z' as unknown as Date,
    end: '2025-05-12T16:30:00.000Z' as unknown as Date,
    description: `A dedicated session to gather feedback from key customers about their experience with our products and services. The goal is to identify areas for improvement, address concerns, and strengthen customer relationships. Participants will have the opportunity to share their thoughts and suggestions in an open and collaborative environment.`,
    color: CalendarEventColor.SECONDARY100,
    resource: {
      members: [
        {
          id: 'R7S8T9U0',
          name: 'David Wilson',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'V1W2X3Y4',
          name: 'Olivia Martinez',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'yUEFfepkdL',
    title: 'Sales Review Meeting',
    start: '2025-05-15T10:00:00.000Z' as unknown as Date,
    end: '2025-05-15T11:30:00.000Z' as unknown as Date,
    description: `A comprehensive review of the sales performance for the current quarter. The meeting will cover key metrics such as revenue growth, conversion rates, and customer acquisition. The team will discuss challenges faced, celebrate successes, and outline strategies to improve future performance.`,
    color: CalendarEventColor.BURGUNDY100,
    resource: {
      members: [
        {
          id: 'Z5A6B7C8',
          name: 'James Anderson',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'D9E0F1G2',
          name: 'Emma Thompson',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'NiYsH1cOSh',
    title: 'Design Team Review',
    start: '2025-05-18T14:00:00.000Z' as unknown as Date,
    end: '2025-05-18T15:30:00.000Z' as unknown as Date,
    description: `A review session for the design team to evaluate ongoing projects and provide feedback on deliverables. The meeting will focus on aligning design outputs with project goals, addressing any roadblocks, and ensuring timelines are met. It’s also an opportunity to brainstorm creative solutions for upcoming tasks.`,
    color: CalendarEventColor.BURGUNDY,
    resource: {
      members: [
        {
          id: 'H3I4J5K6',
          name: 'Daniel Clark',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'L7M8N9O0',
          name: 'Sophie White',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
  {
    eventId: 'Ljqv0TzjZc',
    title: 'Company Anniversary Celebration',
    start: '2025-05-20T18:00:00.000Z' as unknown as Date,
    end: '2025-05-20T22:00:00.000Z' as unknown as Date,
    description: `Celebrate the company’s 10th anniversary with employees, partners, and clients. The evening will include speeches from the CEO and founding members, a video montage of the company’s journey, and awards for outstanding contributions. A gala dinner and entertainment program will follow, providing a memorable experience for all attendees.`,
    color: CalendarEventColor.WARNING,
    resource: {
      members: [
        {
          id: 'C1D2E3F4',
          name: 'Sonam Deki',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
        {
          id: 'G5H6I7J8',
          name: 'Jurme Tenzin',
          image: 'https://github.com/shadcn.png',
          status: MEMBER_STATUS.ACCEPTED,
        },
      ],
    },
  },
];
