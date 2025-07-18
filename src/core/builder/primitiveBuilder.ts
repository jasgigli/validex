// import type { PrimitiveType } from '../../../types/ast/types';
import type { IPrimitiveBuilder } from "../../types/builder/types";
import type { PrimitiveNode } from "../ast/nodes";
import { validate } from '../index';

export class PrimitiveBuilder implements IPrimitiveBuilder {
  private node: PrimitiveNode;
  constructor(type: string) {
    this.node = { type: "primitive", primitive: type as any };
  }
  min(value: number) {
    if (this.node.primitive === 'string' || this.node.primitive === 'number') {
      this.addRule(this.node.primitive, { min: value });
    } else {
      this.addRule('min', { value });
    }
    return this;
  }
  max(value: number) {
    if (this.node.primitive === 'string' || this.node.primitive === 'number') {
      this.addRule(this.node.primitive, { max: value });
    } else {
      this.addRule('max', { value });
    }
    return this;
  }
  email() {
    this.addRule("email");
    return this;
  }
  optional() {
    this.node.optional = true;
    return this;
  }
  transform(name: string, params?: Record<string, any>) {
    if (!this.node.transformers) this.node.transformers = [];
    this.node.transformers.push({ type: "transformer", name, params });
    return this;
  }
  rule(name: string, params?: Record<string, any>) {
    this.addRule(name, params);
    return this;
  }
  private addRule(name: string, params?: Record<string, any>) {
    if (!this.node.rules) this.node.rules = [];
    this.node.rules.push({ type: "rule", name, params });
  }
  toAST(): PrimitiveNode {
    return this.node;
  }

  async safeParse(value: any) {
    const result = await validate(this, value);
    return {
      success: result.valid,
      data: result.value,
      error: result.valid ? null : result.errors,
    };
  }

  async parse(value: any) {
    const result = await validate(this, value);
    if (!result.valid) {
      throw new Error(result.errors.join('; '));
    }
    return result.value;
  }
}
