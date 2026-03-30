import { Injectable } from '@nestjs/common';
import { TOPICS_DATA, Topic } from './topics.data';

@Injectable()
export class TopicsService {
  getAll(): Topic[] {
    return TOPICS_DATA;
  }

  getById(id: string): Topic | undefined {
    return TOPICS_DATA.find(t => t.id === id);
  }

  getSubtopic(topicId: string, subtopicId: string): { id: string; name: string } | undefined {
    const topic = TOPICS_DATA.find(t => t.id === topicId);
    return topic?.subtopics.find(s => s.id === subtopicId);
  }
}
